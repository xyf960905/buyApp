<template>
<div class="order">
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <el-form-item label="收货人姓名" prop="accept_name">
                                <el-input v-model="ruleForm.accept_name">徐小帆</el-input>
                                </el-form-item>
                                <el-form-item label="所属地区" prop="area">
                                  <VDistpicker @selected="selectedArea"
                                    :province="ruleForm.area.province.value"
                                    :city="ruleForm.area.city.value"
                                    :area="ruleForm.area.area.value"
                                  ></VDistpicker>
                                </el-form-item>

                                <el-form-item label="详细地址" prop="address">
                                  <el-input v-model="ruleForm.address">故宫</el-input>
                                </el-form-item>
                                <el-form-item label="手机号码" prop="mobile">
                                  <el-input v-model="ruleForm.mobile">16666666666</el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱" prop="email">
                                  <el-input v-model="ruleForm.email">666666@qq.com</el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码" prop="post_code">
                                  <el-input v-model="ruleForm.post_code">666666</el-input>
                                </el-form-item>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio v-model="ruleForm.payment_id" :label="6">在线支付</el-radio>
                                        <em>手续费：0.00元</em>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                         <el-radio v-model="ruleForm.express_id" :label="1" @change="ruleForm.expressMoment=20">顺丰快递</el-radio>
                                        <em>费用：20元</em>
                                         <el-radio v-model="ruleForm.express_id" :label="2" @change="ruleForm.expressMoment=10">圆通快递</el-radio>
                                        <em>费用：10元</em>
                                         <el-radio v-model="ruleForm.express_id" :label="3" @change="ruleForm.expressMoment=10">韵达快递</el-radio>
                                        <em>费用：10元</em>
                                        <span class="Validform_checktip"></span>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                <tbody>
                    <tr>
                      <th colspan="2" align="left">商品信息</th>
                      <th width="84" align="left">单价</th>
                      <th width="84" align="center">购买数量</th>
                      <th width="104" align="left">金额(元)</th>
                    </tr>
                    <!-- 商品数据 -->
                    <tr v-for="(item) in goodsList" :key="item.id">
                      <td width="68">
                        <!-- <a target="_blank" href="/goods/show-89.html"> -->
                        <router-link :to="'/detail/'+item.id">
                          <img :src="item.img_url" class="img">
                        </router-link>
                        <!-- </a> -->
                      </td>
                      <td>
                        <!-- <a target="_blank" href="/goods/show-89.html"> -->
                        <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>

                        <!-- </a> -->
                      </td>
                      <td>
                        <span class="red">￥{{item.sell_price}}</span>
                      </td>
                      <td align="center">{{item.buycount}}</td>
                      <td>
                        <span class="red">￥{{item.buycount*item.sell_price}}</span>
                      </td>
                    </tr>
                  </tbody>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea name="message" class="input" v-model="ruleForm.message" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{totalPrice+ruleForm.expressMoment}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <!-- <a class="btn button" href="/cart.html">返回购物车</a> -->
                                        <router-link to="/shopcart" class="btn button">返回购物车</router-link>
                                        <a id="btnSubmit" class="btn submit" @click="submit('ruleForm')">确认提交</a>
                                        <!-- <router-link to="/payMoney" @click="submit()" id="btnSubmit" class="btn submit">确认提交</router-link> -->
                                    </p>
                                </div>
                            </div>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


</div>
</template>
<script>
import VDistpicker from 'v-distpicker'


export default {
  name: "order",
  
  data: function() {
      // 自定义校验规则 函数 会被element-ui内部调用
     var validateMobile = (rule, value, callback) => {
      //  console.log(value)
       // 空值判断
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          // 非空 格式验证
          // 正则表达式的规则
          let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
          // 用正则判断对错
          if(reg.test(value)==true){
            callback();
          }else{
            // 格式不对
            callback(new Error('请输入正确的手机号！'));
          }
       
        }
      };
      // 自定义校验规则 函数 会被element-ui内部调用
     var validateEmail = (rule, value, callback) => {
      //  console.log(value)
       // 空值判断
        if (value === '') {
          callback(new Error('请输入邮箱地址'));
        } else {
          // 非空 格式验证
          // 正则表达式的规则
          let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
          // 用正则判断对错
          if(reg.test(value)==true){
            callback();
          }else{
            // 格式不对
            callback(new Error('请输入正确的邮箱地址！'));
          }
       
        }
      };
    // 自定义校验规则 函数 会被element-ui内部调用
     var validatePostCode = (rule, value, callback) => {
      //  console.log(value)
       // 空值判断
        if (value === '') {
          callback(new Error('请输入邮编'));
        } else {
          // 非空 格式验证
          // 正则表达式的规则
          let reg = /^[1-9]\d{5}(?!\d)$/;
          // 用正则判断对错
          if(reg.test(value)==true){
            callback();
          }else{
            // 格式不对
            callback(new Error('请输入正确的邮编！'));
          }
       
        }
     };
    return {
      goodsList: [],
      ids: "",
      // 商品个数,
      totalCount: 0,
      // 商品总价格(不包含运费)
      totalPrice: 0,
      ruleForm: {
        // 收货人姓名
        accept_name: "徐小帆",
        // 收货人地址
        address: "福田",
        // 收货人手机号
        mobile: "16666666666",
        // 邮箱地址
        email: "666666@qq.com",
        // 邮编
        post_code: "666666",
        // 地区
        area: {
          province: {
            code: "440000",
            value: "广东省"
          },
          city: {
            code: "440300",
            value: "深圳市"
          },
          area: {
            code: "440306",
            value: "宝安区"
          }
        },
        payment_id:6,
        // 快递编码
        express_id: 1,
        // 快递费
        expressMoment:20,
        // 订单备注
        message:''
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入活动名称", trigger: "change" },
          {
            min: 2,
            max: 10,
            message: "长度在 3 到 5 个字符",
            trigger: "change"
          }
        ],
        address: [
          // required 必须  message 提示信息  trigger 触发时机
          { required: true, message: "请输入收货人地址", trigger: "change" },
          // min 最短  max 最长   message 提示信息   trigger 触发时机
          { min: 2, message: "你地址只有这么短?", trigger: "change" }
        ],
        // 手机号的验证规则
        mobile: [{ validator: validateMobile, trigger: "change" }],
        // 邮箱的验证规则
        email: [{ validator: validateEmail, trigger: "change" }],
        // 邮箱的验证规则
        post_code: [{ validator: validatePostCode, trigger: "change" }]
      }
    };
  },
  methods:{
    selectedArea(newArea){
      // console.log(newArea);
      this.ruleForm.area = newArea;
    },
    submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             // 总金额
          this.ruleForm.goodsAmount = this.totalPrice;
          // 商品id们
          this.ruleForm.goodsids = this.ids;
          let obj={};
          this.goodsList.forEach(v=>{
            obj[v.id]=v.buycount;
          })
          this.ruleForm.cargoodsobj=obj;
          this.$axios.post("site/validate/order/setorder",this.ruleForm)
          .then(result=>{            
            this.$Message.success("订单提交成功");
            this.$router.push("/payMoney/"+result.data.message.orderid);
            this.goodsList.forEach(v=>{
                this.$store.commit('del',v.id);
              })
          }); 
          } else {
            // console.log('error submit!!');
            this.$Message.warning("数据不完整,请检查");
            return false;
          }
        });
         
      }
  },

  created() {
    this.ids = this.$route.params.selectedids;
    this.$axios
      .get(`site/validate/order/getgoodslist/${this.ids}`)
      .then(result => {
        this.goodsList = result.data.message;
        result.data.message.forEach(v => {
          v.buycount = this.$store.state.count[v.id];
          this.totalCount += v.buycount;
          this.totalPrice += v.buycount * v.sell_price;
        });
        // console.log(this.goodsList);
      });
  },
  components:{VDistpicker}
};
</script>
<style>
</style>

