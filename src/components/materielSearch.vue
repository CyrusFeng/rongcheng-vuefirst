<template>
  <div class="materiel-search-wrap" @click="" ref="searchWrap">
    <div class="search-bar-wrap" @click.stop="">
      <div class="search-bar">
        <i class="search-icon"></i>
        <label for="search1" class="showName" v-show="!labelStatus">请输入物料名称</label>
        <input type="text" id="search1" @input="search($event)" :value="selectedResult">
      </div>
      <span class="cancelBtn" @click="clearSearchResult">清空</span>
    </div>
    <div class="result-wrap" @click.stop="" v-show="showResult">
      <ul class="result">
        <li v-for="item in searchResult" @click="resultToSearchBar($event,item.materielId)">{{item.materiel}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "materielSearch",
    data(){
      return {
        timer:null,
        labelStatus : false,
        searchStatus: true,
        searchResult: [],
        selectedResult: '',
        showResult: false,
      }
    },
    methods:{
      // changeShowSearch() {
      //   this.searchStatus = !this.searchStatus
      // },
      search(e) {
        this.selectedResult = e.target.value
        this.labelHidden(e)
        //----------------
        //函数节流
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          if (e.target.value !== '') {
            axios.get('getMateriel.main', {
              params: {
                keyword: e.target.value
              }
            })
              .then((response) => {
                this.searchResult = response.data.data;
                this.showResult = true
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            this.showResult = false
            this.searchResult = []
            this.selectedResult = ''
            this.$emit('listenToChildEvent','')
          }
        }, 300)
        //this.selectedResult = e != null ? e.target.value : keyword
      },
      labelHidden(e) {
        this.labelStatus = true
        if (e.target.value === '') {
          this.labelStatus = false
        }
      },
      resultToSearchBar(e,id) {
        this.selectedResult = e.target.textContent
        this.$emit('listenToChildEvent',id)
        this.hiddenSearch()
        this.searchResult = []
      },
      hiddenSearch() {
        this.showResult = false;
      },
      clearSearchResult(){
        this.$emit('listenToChildEvent','')
        this.selectedResult = ''
      }
    }
  }
</script>

<style scoped>
  .materiel-search-wrap {
    width: 100%;
    /*position: fixed;*/
    /*z-index: 2;*/
    /*top: 0;*/
    /*left: 0;*/
    /*height: 100%;*/
    background-color: #fff;
  }

  .materiel-search-wrap .search-bar-wrap {
    padding: 0.1rem 0 0.1rem 0.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F2F6F9;
  }

  .materiel-search-wrap .search-bar-wrap .search-bar {
    margin-right: 0.06rem;
    padding: 0.08rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #e7e7e7;
    border-radius: 0.1rem;
    flex: 1;
    position: relative;
  }

  .materiel-search-wrap .search-bar-wrap .search-bar label {
    position: absolute;
    top: 50%;
    left: 0.35rem;
    transform: translateY(-50%);
    font-size: 0.14rem;
    color: #8e8e93;
  }

  .materiel-search-wrap .search-bar-wrap .search-bar .search-icon {
    margin: 0 0.12rem;
  }

  .materiel-search-wrap .search-bar-wrap .search-bar input {
    margin-right: 0.5rem;
    height: 0.22rem;
    font-size: 0.14rem;
    background: #e7e7e7;
    border: 0;
    flex: 1;
  }

  .materiel-search-wrap .search-bar-wrap .cancelBtn {
    margin-right: 0.1rem;
    font-size: 0.14rem;
    color: #007aff;
  }

  .materiel-search-wrap .result-wrap {
    margin-left: 0.12rem;
  }

  .materiel-search-wrap .result-wrap .result li {
    padding: 0.14rem 0;
    position: relative;
    font-size: 0.12rem;
    color: #929292;
    /*border-bottom: 1px solid #efefef;*/
  }

  .materiel-search-wrap .result-wrap .result li::after {
    content: "  ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #efefef;
    /* 如果不用 background-color, 使用 border-top:1px solid #e0e0e0; */
  }

  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .materiel-search-wrap .result-wrap .result li::after {
      transform: scaleY(.5);
    }
  }

  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .materiel-search-wrap .result-wrap .result li::after {
      transform: scaleY(.333333);
    }
  }
</style>
