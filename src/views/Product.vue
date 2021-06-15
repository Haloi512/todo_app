<template>
  <div class="product">
    <div class="product-title">
      <span>TodoList Crud</span>
    </div>
    <el-card class="box-card product-filter">
      <el-row>
        <el-col>
          <el-input placeholder="Search" v-model="input">
            <template #prefix>
              <i class="el-input__icon el-icon-search"></i>
            </template>
          </el-input>
          <el-button @click="handleAdddWork" type="success">Add work</el-button>
          <el-button
            v-bind:style="{ float: 'left' }"
            @click="handleDeleteSelectItem"
            type="primary"
            >Delete selected works</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card product-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="Name" width="200px">
          <template v-slot="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
          property="description"
          label="Description"
          width="200px"
        >
        </el-table-column>
        <el-table-column label="Created at" width="200px" show-overflow-tooltip>
          <template v-slot="scope">{{
            new Date(scope.row.createdAt).toLocaleString()
          }}</template>
        </el-table-column>
        <el-table-column label="Actions" width="400px">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Modal
      type="create"
      :visible="modalCreateVisible"
      @handleChangeVisible="handleChangeCreateVisible"
      :formData="formData"
      @handleRefesh="fetchData"
    />

    <Modal
      type="edit"
      :visible="modalEditVisible"
      @handleChangeVisible="handleChangeEditVisible"
      :formData="formData"
      @handleRefesh="fetchData"
    />
    <Modal
      type="delete"
      :visible="modalDeleteVisible"
      @handleChangeVisible="handleChangeDeleteVisible"
      :formData="formData"
      @handleRefesh="fetchData"
    />
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";
import axios from "axios";

export default {
  name: "Product",
  components: {
    Modal,
  },
  data() {
    return {
      formData: { name: "", description: "" },
      tableData: [],
      modalType: "",
      input: "",
      modalCreateVisible: false,
      modalEditVisible: false,
      modalDeleteVisible: false,
      multipleSelection: [],
    };
  },
  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData: function () {
      this.$Progress.start();
      axios
        .get("https://60c7120919aa1e00176a0377.mockapi.io/api/todolist")
        .then((res) => {
          if (res) {
            console.log(res);
            this.$Progress.finish();
            this.tableData = res.data;
          }
        })
        .catch((err) => {
          this.$Progress.fail();
          this.$toast(err, {
            slotLeft: `<i class="el-icon-edit"></i>`,
          });
        });
    },

    toggleSelection(rows) {
      console.log(rows);
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    handleAdddWork() {
      this.modalType = "create";
      this.modalCreateVisible = true;
    },
    handleChangeCreateVisible() {
      this.modalCreateVisible = !this.modalCreateVisible;
    },
    handleChangeEditVisible() {
      this.modalEditVisible = !this.modalEditVisible;
    },
    handleChangeDeleteVisible() {
      this.modalDeleteVisible = !this.modalDeleteVisible;
    },
    handleEdit(a, b) {
      this.modalType = "edit";
      this.modalEditVisible = true;
      this.formData = b;
    },
    handleDelete(a, b) {
      this.modalType = "delete";
      this.modalDeleteVisible = true;
      this.formData = b;
    },
    handleDeleteSelectItem() {
      this?.multipleSelection.map((item) => {
        axios
          .delete(
            `https://60c7120919aa1e00176a0377.mockapi.io/api/todolist/${item?.id}`
          )
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              this.$Progress.finish();
              this.$toast("Delete work successfully", {
                slotLeft: `<i class="el-icon-edit"></i>`,
              });
              this.fetchData();
            }
          })
          .catch(() => {
            this.$Progress.fail();
            this.$toast("Delete work failed", {
              slotLeft: `<i class="el-icon-edit"></i>`,
            });
          });
      });
    },
  },
};
</script>

<style lang="scss">
.product {
  padding: 24px 100px;
  &-title {
    justify-content: flex-start;
    display: flex;
    align-items: center;
    height: 50px;
  }
  &-filter {
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .el-card__body {
      .el-row {
        .el-col {
          display: flex;
          .el-input {
            width: 400px !important;
          }
          .el-button {
            margin-left: 20px;
          }
        }
      }
    }
  }
  &-table {
    margin-top: 24px;
    height: 100%;
    min-height: 500px;
  }
}
</style>
