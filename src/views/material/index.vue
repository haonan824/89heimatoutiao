<template>
  <el-card v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-row>
      <div slot="header" class="clearfix">
        <bread-crumbs>
          <template slot="title">素材管理</template>
        </bread-crumbs>
      </div>
    </el-row>
    <el-row type="flex" justify="end">
      <el-upload :http-request='getImg' :show-file-list="false" action>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <el-tabs v-model="mold" @tab-click="change">
      <el-tab-pane label="素材全部" name="all">
        <div class="divimg">
          <el-card class="classsimg" v-for="itme in list" :key="itme.id">
            <img :src="itme.url" class="image" alt />
            <el-row class="icon">
              <i class="el-icon-star-on" style="float: left;line-height: 30px;"></i>
              <i class="el-icon-delete-solid" style="float:right; line-height: 30px;"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="素材收藏" name="collect">
        <div class="divimg">
          <el-card class="classsimg" v-for="itme in list" :key="itme.id">
            <img :src="itme.url" class="image" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-row style="height:60px" type="flex" justify="center" align="middle">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change="pages"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      list: {},
      mold: 'all',
      page: {
        total: 0,
        pageSize: 8,
        currentPage: 1
      }
    }
  },
  methods: {
    getImg (params) {
      this.loading = true
      console.log(params)
      let from = new FormData()
      from.append('image', params.file)
      from.get('image')
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: from
      }).then(res => {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        this.getimg()
        this.loading = false
      })
    },
    change () {
      this.page.currentPage = 1
      this.getimg()
    },
    pages (next) {
      this.page.currentPage = next
      this.getimg()
    },
    getimg () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.mold === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    }
  },
  created () {
    this.getimg()
  }
}
</script>

<style lang="less" scoped>
.divimg {
  display: flex;
  flex-wrap: wrap;
  .classsimg {
    margin: 20px 10px;
    position: relative;
    .image {
      width: 180px;
      height: 190px;
    }
    .icon {
      padding: 0 50px;
      background: #f4f5f6;
      width: 100%;
      height: 30px;
      font-size: 20px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
