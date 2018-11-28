<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="images.normal_size.length"
                                    :base-images="images"
                                    :base-zoomer-options="zoomerOptions"
                                />
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" :min="1" :max="goodsinfo.stock_quantity"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button  @click="add2cart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>

                                        <li>
                                            <a href="javascript:;"  @click="tabIndex=1" :class="{selected:tabIndex==1}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="tabIndex=0" :class="{selected:tabIndex==0}">商品评论</a>
                                        </li>

                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" style="display: block;" v-html="goodsinfo.content" v-show="tabIndex==1">
                                内容
                            </div>
                            <div class="tab-content" style="display: block;" v-show="tabIndex==0">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" @keyup.enter="addcomment" sucmsg=" " datatype="*10-1000" v-model="writecomment" nullmsg="请填写评论内容！" > </textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="addcomment">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);" v-show="totalcount==0">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | time}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                       <Page :total="totalcount" show-sizer  placement="top" :page-size-opts="[6,8,10]"
                                       @on-change="changepage" @on-page-size-change="changesize" show-elevator/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+item.id">
                                                <img :src="item.img_url">
                                            <!-- </a> -->
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">
                                                {{item.title}}
                                            <!-- </a> -->
                                            </router-link>
                                            <span>{{item.add_time | time}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop>
            <span>👳‍</span>
        </BackTop>
    </div>
</template>
<script>
export default {
  name: "detail",
  data: function() {
    return {
      ID: "",
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      buyCount: 1,
      tabIndex: 1,
      // 评论内容
      comments: [],
      // 总评论数
      totalcount: 0,
      pageIndex: 1,
      pageSize: 10,
      writecomment: "",
    //   放大镜需要的参数
    images:
    {                                                                                                             
      'normal_size': [
            
          ]                                                                              
     } ,
     zoomerOptions:{
        'zoomFactor': 4,
        'pane': 'container-round',
        'hoverDelay': 300,
        'namespace': 'inline-zoomer',
        'move_by_click':true,
        'scroll_items': 5,
        'choosed_thumb_border_color': "#bbdefb"
     }
    };
  },
  methods: {
    // 初始化数据
    initData() {
      this.buyCount = 1;
      this.ID = this.$route.params.artID;
      this.$axios
        .get(`http://111.230.232.110:8899/site/goods/getgoodsinfo/${this.ID}`)
        .then(result => {
          // console.log(result);
          this.goodsinfo = result.data.message.goodsinfo;
          //   热卖商品
          this.hotgoodslist = result.data.message.hotgoodslist;
          this.images.normal_size=[];
          //   图片列表
          this.imglist = result.data.message.imglist;
            this.imglist.forEach(v => {
          this.images.normal_size.push({
              id:v.id,
              url:v.original_path
          })
                       
            });
});
      this.getComments();
    },
    getComments() {
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.ID
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(result => {
          // console.log(result);
          // 评论信息
          this.comments = result.data.message;
          // 总个数
          this.totalcount = result.data.totalcount;
        });
    },
    changepage(value) {
      this.pageIndex = value;
      // this.pageSize=value2;
      this.getComments();
    },
    changesize(value) {
      this.pageSize = value;
      this.getComments();
    },
    addcomment() {
      // alert(this.writecomment)
      if (this.writecomment.trim() == "") {
        this.$Message.warning("不能为空");
        this.writecomment = "";
      } else {
        this.$axios
          .post(`site/validate/comment/post/goods/${this.ID}`, {
            commenttxt: this.writecomment
          })
          .then(reponse => {
            if (reponse.data.status) {
              this.$Message.warning("添加失败");
              //   alert("添加错误");
            } else {
              this.$Message.success("评论成功");
              this.writecomment = "";
              this.getComments();
              // alert(1)
            }
            // console.log(reponse);
          });
      }
    },
    add2cart() {
      this.$store.commit("increment", {
        ID: this.ID,
        buyCount: this.buyCount
      });
      this.buyCount = 1;
      this.$Message.success("加入成功");
    }
  },
  created() {
    this.initData();
  },
  watch: {
    $route() {
        this.images.normal_size=[];
      this.initData();
    }
  }
};
</script>
<style>
.tab-content img {
  /* display: block; */
  vertical-align: top;
  max-width: 100%;
}
.ivu-back-top span {
  font-size: 100px;
}
.inline-zoomer-zoomer-box{
    width: 395px;
    /* height: 320px; */
}
.thumb-list img{
    width: 100px;
    height: 100px;
}
</style>

