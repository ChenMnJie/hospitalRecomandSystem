<template>
  <div id="showDataGrid">
    <el-table
      :data="tableBuild.data"
      :height="tableBuild.height"
      :border="tableBuild.border"
      :header-cell-style="headerCellStyle"
      v-loading="tableBuild.loading"
    >
      <el-table-column
        v-for="(item,index) in tableBuild.column"
        :key="index"
        :type="item.type"
        :prop="item.field"
        :label="item.label"
        :min-width="item.width"
        :align="item.align"
        :sortable="item.sortable"
      >
        <template slot-scope="scope">
          <div style="cursor:pointer;">{{scope.row[item.field]}}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerCellStyle:{
        'background-color': '#e0f2fcdc',
        'color': '#555',
        'border': '1px #d1eeffdc solid'
      }
    }
  },
  props:{
    "tableBuild":Object
  }
}
</script>