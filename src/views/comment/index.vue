<template>
  <el-card>
    <div slot="header" class="clearfix">
        <bread-crumbs>
            <template slot="title">评论列表</template>
        </bread-crumbs>
    </div>
    <el-table :data='list' >
        <el-table-column prop='title'  label="标题" width="500"></el-table-column>
        <el-table-column :formatter='formAtter' prop='comment_status' label="评论状态"></el-table-column>
        <el-table-column prop='total_comment_count' label="总评论数"></el-table-column>
        <el-table-column prop='fans_comment_count' label="粉丝评论数"></el-table-column>
        <el-table-column label="操作" width='200' >
            <div slot-scope="obj">
                <el-button type="text">修改</el-button>
                <el-button type="text">{{ obj.row.comment_status ? '关闭评论' : '打开评论' }}</el-button>
            </div>
        </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.$axios({
      url: '/articles',
      params: { response_type: 'comment' }
    }).then(res => {
      this.list = res.data.results
    })
  },
  methods: {
    formAtter: function (row, column, cellValue, index) {
      // row  当前行数据
      // column 当前列属性
      // cellValue 当前单元格的值
      // index  当前下标
      return cellValue ? '打开' : '关闭'
    }
  }
}
</script>

<style>

</style>
