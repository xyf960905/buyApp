<template>
    <div class="orderList right-auto">
        <div class="bg-wrap" style="min-height: 765px;">
                                        <div class="sub-tit">
                                            <ul>
                                                <li class="selected">
                                                    <a href="/user/order-list.html">交易订单</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="table-wrap">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                                                <tbody>
                                                    <tr>
                                                        <th width="16%" align="left">订单号</th>
                                                        <th width="10%">姓名</th>
                                                        <th width="12%">订单金额</th>
                                                        <th width="11%">下单时间</th>
                                                        <th width="10%">状态</th>
                                                        <th width="12%">操作</th>
                                                    </tr>
                                                    <tr v-for="(item) in orderList" :key="item.id">
                                                        <td>{{item.order_no}}</td>
                                                        <td align="left">{{item.accept_name}}</td>
                                                        <td align="left">
                                                            <strong style="color: red;">￥{{item.order_amount}}</strong>
                                                            <br> 在线支付
                                                        </td>
                                                        <td align="left">{{item.add_time | time}}</td>
                                                        <td align="left">
                                                            待付款
                                                        </td>
                                                        <td align="left">
                                                            <router-link to="/vipCenter/orderDetail">查看订单</router-link>
                                                            <!-- <a href="#/site/member/orderinfo/12" class=""></a> -->
                                                            <br>
                                                            <!-- <a href="#/site/goods/payment/12" class="">|去付款</a> -->
                                                            <router-link to="'/payMoney/'+item.id" v-show="item.status==1">|去付款</router-link>
                                                            <br>
                                                            <br>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="page-foot">
                                                <div class="block">
                                                    <!-- <span class="demonstration">完整功能</span> -->
                                                    <el-pagination
                                                      @size-change="handleSizeChange"
                                                      @current-change="handleCurrentChange"                                                   
                                                      :current-page="pageIndex"
                                                      :page-sizes="[5, 10, 20]"
                                                      :page-size="10"
                                                      layout="total, sizes, prev, pager, next, jumper"
                                                      :total="totalcount">
                                                    </el-pagination>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
    </div>
</template>
<script>
    export default{
        name:"orderList",
        data:function(){
            return {
                pageIndex:1,
                pageSize:10,
                orderList:[],
                totalcount: 0
            }
        },
        methods:{
            getfirst(){
                 this.$axios.get('site/validate/order/userorderlist?pageIndex='+this.pageIndex+'&pageSize='+this.pageSize)
            .then(result=>{
                // console.log(result)
                this.orderList=result.data.message;
                this.totalcount=result.data.totalcount;
            })
            },
            handleCurrentChange(val){
                this.pageIndex=val;
                this.getfirst();
            },
            handleSizeChange(val){
                this.pageIndex=1;
                this.pageSize=val;
                this.getfirst();
            }

        }
        ,
        created(){
           this.getfirst();
        }
    }
</script>
