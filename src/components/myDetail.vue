<template>
  <div>
    <div class="edit-wrap">
      <i :class="edit===false?'edited-icon':'editing-icon'" @click="edit = !edit"></i>
    </div>
    <div class="details-wrap">
      <section class="head">
        <div class="row">
          <div class="left">
            <span class="title">{{data.materiel}}</span>
          </div>
          <div class="right">
            <div v-show="!edit" class="status-wrap">
              <span class="status"
                    :class="data.status === 1 ? 'normal':'close'">{{data.status === 1 ? '正常':'关闭'}}</span>
              <i :class="data.status === 1 ? 'normal-icon':'close-icon'"></i>
            </div>
            <div class="radio-wrap" v-show="edit">
              <div class="group">
                <input type="radio" class="rdo" name="sex" checked style="">
                <label class="rdo-text yes">是</label>
                <i class="normal-icon"></i>
              </div>
              <div class="group">
                <input type="radio" class="rdo" name="sex">
                <label class="rdo-text no">否</label>
                <i class="close-icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="left">
            <span class="title">{{data.supplier}}</span>
          </div>
          <div class="right">
            <span class="content"></span>
          </div>
        </div>
      </section>
      <section>
        <div class="row">
          <div class="left">
            <span class="title">日期</span>
          </div>
          <div class="right">
            <span class="content">{{data.date}}</span>
          </div>
        </div>
        <div class="row">
          <div class="left">
            <span class="title">单据编号</span>
          </div>
          <div class="right">
            <span class="content">{{controlLength(data.materielId,20)}}</span>
          </div>
        </div>
        <div class="row">
          <div class="left">
            <span class="title">分录序列号</span>
          </div>
          <div class="right">
            <span class="content">{{data.serialNum}}</span>
          </div>
        </div>
      </section>
      <section>
        <div class="row">
          <div class="left">
            <span class="title">累计收货检斤量</span>
          </div>
          <div class="right">
            <span class="content">{{data.weight}}</span>
          </div>
        </div>
        <div class="row">
          <div class="left">
            <span class="title">订货数量</span>
          </div>
          <div class="right">
            <span class="content" v-show="!edit">{{data.orderQuantity}}</span>
            <input type="text" class="weight-input" v-show="edit">
          </div>
        </div>
        <div class="row">
          <div class="left">
            <span class="title">已完成检车辆数</span>
          </div>
          <div class="right">
            <span class="content">{{data.carNum}}</span>
          </div>
        </div>
      </section>
      <section>
        <div class="row">
          <div class="left">
            <span class="title">采购组织</span>
          </div>
          <div class="right">
            <span class="content">{{data.organization}}</span>
          </div>
        </div>
        <div class="row">
          <div class="left">
            <span class="title">运输方式</span>
          </div>
          <div class="right">
            <span class="content">{{data.transportMode}}</span>
          </div>
        </div>
      </section>
    </div>
    <div class="btns" v-show="edit">
      <span class="save" @click="save">保存</span>
    </div>
    <transition name="fade">
      <tips v-show="showTips" :showTip="showTip"></tips>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios'
  import tips from './tips'

  export default {
    name: 'myDetail',
    components: {
      tips
    },
    created() {

    },
    beforeRouteEnter(to, from, next) {

      next((vm) => {
        console.log('beforeRouteEnter')
        vm.id = vm.$route.params.id
        axios.get('http://rap2api.taobao.org/app/mock/121282/getDetail', {
          params: {
            id: vm.id
          }
        })
          .then((response) => {
            vm.data = response.data.data[0];
            vm.status = vm.data.status
            vm.orderQuantity = vm.data.orderQuantity
          })
          .catch(function (error) {
            console.log(error);
          });
      })
    },
    mounted() {
      // console.log('detailmounted')
      // this.id = this.$route.params.id
      // axios.get('http://rap2api.taobao.org/app/mock/121282/getDetail', {
      //   params: {
      //     id: this.id
      //   }
      // })
      //   .then((response) => {
      //     this.data = response.data.data[0];
      //     this.status = this.data.status
      //     this.orderQuantity = this.data.orderQuantity
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    },
    methods: {
      save() {
        //this.showLoadingImg = true
        axios.get('http://rap2api.taobao.org/app/mock/121282/update', {
          params: {
            id: this.id,
            status: this.status,
            orderQuantity: this.orderQuantity
          }
        })
          .then((response) => {
            //this.showLoadingImg = false
            console.log(response.data)
            this.showTip = response.data.success
            this.showTips = true
            setTimeout(() => {
              this.showTips = false
            }, 1000)
            if (response.data.success === true) {
              this.data = response.data.data[0];
              this.edit = false
            } else {

            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      controlLength(str, len) {
        if (str) {
          return str.length > 6 ? str.slice(0, len) + '...' : str
        }

      },
    },
    data: function () {
      return {
        id: 0,
        edit: false,
        data: {},
        status: 0,
        orderQuantity: 0,
        showLoadingImg: false,
        showSuccess: false,
        showFail: false,
        showTip: false,
        showTips: false
      }
    }
  }
</script>

<style scoped>
  .edit-wrap {
    height: 0.33rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #F2F6F9;
    border-bottom: 1px solid #e9e9e9;
  }

  .edit-wrap .edited-icon, .edit-wrap .editing-icon {
    margin-right: 0.1rem;
    display: inline-block;
    width: 0.18rem;
    height: 0.18rem;
  }

  .edit-wrap .edited-icon {
    background: url("../assets/edited.png") no-repeat;
    background-size: contain;
  }

  .edit-wrap .editing-icon {
    background: url("../assets/editing.png") no-repeat;
    background-size: contain;
  }

  .radio-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .radio-wrap .group {
    margin-right: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .radio-wrap .group:last-child {
    margin-right: 0;
  }

  .rdo {
    width: 0px;
    border: 0;
    margin-right: 0.2rem;
    /*选项之间的距离*/
    position: relative;
    /*display: inline-block;*/
    /*vertical-align: middle;*/
  }

  .rdo:before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    /* border-radius: 50%; */
    /*圆角*/
    transition: .4s ease;
    /*中点跳转的速度*/
    border-radius: 50%;
    border: 1px solid #bbbbbb;
  }

  .rdo:before {
    /*所有选项*/
    width: 0.16rem;
    height: 0.16rem;
    /*外圆的大小*/
    background-color: #eeeeee;
    /*未选的中点的颜色*/
  }

  .rdo:checked:before {
    background-color: #007aff;
    /*选中的外圆边框*/
  }

  .rdo-text {
    margin-right: 0.08rem;
    font-size: 0.12rem;
    position: relative;
    /*display: inline-block;*/
    /*vertical-align: middle;*/
  }

  .rdo-text.yes {
    color: #19be6b;
  }

  .rdo-text.no {
    color: #929292;
  }

  .normal-icon, .close-icon {
    display: inline-block;
    width: 0.14rem;
    height: 0.14rem;

  }

  .normal-icon {
    background: url("../assets/normal.png") no-repeat;
    background-size: contain;
  }

  .close-icon {
    background: url("../assets/close.png") no-repeat;
    background-size: contain;
  }

  section {
    margin-left: 0.12rem;
    border-bottom: 1px solid #efefef;
  }

  section:last-child {
    border-bottom: 0;
  }

  .row {
    padding: 0.12rem 0.12rem 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .row:last-child {
    padding-bottom: 0.12rem;
  }

  section.head .row .left .title {
    color: #030303;
  }

  .row .left .title {
    font-size: 0.14rem;
    color: #030303;
    color: #929292;
  }

  .row .right .status-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .row .right .status {
    margin-right: 0.08rem;
    font-size: 0.14rem;
  }

  .row .right .status.normal {
    color: #19be6b;
  }

  .row .right .status.close {
    color: #929292;
  }

  .row .right .content {
    font-size: 0.14rem;
    color: #030303;
  }

  .row .right .weight-input {
    border: 1px solid #eee;
    font-size: 0.14rem;
    width: 1rem;
    text-align: right;
  }

  .btns {
    text-align: center;
  }

  .btns .save {
    margin-top: 0.35rem;
    padding: 0.1rem 0.66rem;
    display: inline-block;
    background: #007aff;
    border-radius: 0.28rem;
    font-size: 0.15rem;
    color: #ffffff;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

</style>
