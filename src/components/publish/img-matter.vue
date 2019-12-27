<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="matter">
        <div class="bossimg">
            <div class="showimg" v-for="(itme,index) in list" :key='index'>
                <img @click="putimg(itme.url)" :src="itme.url" alt="">
            </div>
        </div>
         <el-row style="height:60px" type='flex' justify='center' align='middle'>
      <el-pagination background
      :total='pages.total'
      :page-size='pages.per_page'
      :current-page='pages.page'
      @current-change='getpage'
      layout="prev, pager, next"></el-pagination>
    </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="uploading">
        <el-upload class="all"
        :show-file-list="false"
        action
        :http-request='uploading'
        >
            <i class="el-icon-plus"></i>
        </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'matter',
      list: [],
      pages: {
        collect: false,
        page: 1, // 当前页数
        per_page: 8, // 每页数量
        total: 0
      }
    }
  },
  methods: {
    uploading (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        console.log(res)
        this.$emit('transmit', res.data.url)
      })
    },
    putimg (img) {
      this.$emit('transmit', img)
    },
    getpage (next) {
      this.pages.page = next
      this.getAll()
    },
    getAll () {
      this.$axios({
        url: '/user/images',
        params: this.pages
      }).then(res => {
        console.log(res)
        this.list = res.data.results
        this.pages.total = res.data.total_count
      })
    }
  },
  created () {
    this.getAll()
  }

}
</script>

<style lang="less" scoped>
.bossimg{
    margin: 0 auto;
    .showimg{
    width: 120px;
    height: 120px;
    // border: 1px solid red;
    display: inline-block;
    margin: 20px 12px;
    img{
        width:100%;
        height: 100%;
    }
}
}
.all{
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    font-size: 40px;
    text-align: center;
    line-height: 200px;
    margin: 0 auto;

}

</style>
