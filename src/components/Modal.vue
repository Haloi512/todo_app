
<template>
  <div class="modal">
    <el-dialog
      :title="modalTitle"
      :model-value="visible"
      :width="type !== 'delete' ? '40%' : '30%'"
      center
      :before-close="handleClose"
    >
      <form class="form" id="app">
        {{ seletedId }}
        <div class="form-item" v-if="type !== 'delete'">
          <label for="name">Name</label>
          <el-input id="name" v-model="name" />
          <span class="form-item__error" v-for="error in errors" :key="error">{{
            error.name
          }}</span>
        </div>
        <div class="form-item" v-if="type !== 'delete'">
          <label for="description">Description</label>
          <el-input id="description" v-model="description" />
          <span class="form-item__error" v-for="error in errors" :key="error">{{
            error.desciption
          }}</span>
        </div>

        <div class="form-item">
          <el-button
            :type="
              type === 'create'
                ? 'success'
                : type === 'delete'
                ? 'danger'
                : 'primary'
            "
            @click="(e) => checkForm(e)"
            >Yes</el-button
          ><el-button type="submit" @click="handleClose" value="Submit"
            >No</el-button
          >
        </div>
      </form>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from "axios";

export default {
  name: "Modal",
  props: ["type", "formData", "visible"],

  data() {
    return {
      modalTitle:
        this.type === "create"
          ? "Add your work"
          : this.type === "edit"
          ? "Edit your work"
          : this.type === "delete"
          ? "Are you sure to delete this work"
          : "",
      name: "",
      description: "",
      errors: [],
    };
  },
  watch: {
    formData: {
      deep: true,
      handler() {
        this.name = this.type !== "create" ? this.formData.name : "";
        this.description =
          this.type !== "create" ? this.formData.description : "";
      },
    },
    type: {
      deep: true,
      handler() {
        if (this.type === "create") {
          this.name = "";
          this.description = "";
        }
      },
    },
  },

  methods: {
    checkForm: function (e) {
      this.errors = [];
      if (!this.name) {
        this.errors.push({ name: "Name required." });
      } else {
        this.errors = this.errors.filter(
          (item) => Object.keys(item) !== "name"
        );
      }
      if (!this.description) {
        this.errors.push({ desciption: "description required." });
      } else {
        this.errors = this.errors.filter(
          (item) => Object.keys(item) !== "description"
        );
      }

      if (this.errors.length == 0) {
        if (this.type == "create") {
          const params = {
            name: this.name,
            description: this.description,
            created_at: new Date(),
          };
          this.$Progress.start();
          axios
            .post(
              "https://60c7120919aa1e00176a0377.mockapi.io/api/todolist",
              params
            )
            .then((res) => {
              console.log(res);
              if (res.status === 200 || res.status === 201) {
                this.$Progress.finish();
                this.$toast("Add work successfully", {
                  slotLeft: `<i class="el-icon-edit"></i>`,
                });
                this.handleClose();
                this.name = "";
                this.description = "";
                this.$store.commit("addData", res);
                // this.$emit("handleRefesh");
              }
            })
            .catch((err) => {
              this.$Progress.fail();
              this.$toast(err, {
                slotLeft: `<i class="el-icon-edit"></i>`,
              });
              this.handleClose();
              this.name = "";
              this.description = "";
            });
        }
        if (this.type === "edit") {
          const params = {
            name: this.name,
            description: this.description,
            createdAt: new Date(),
          };
          this.$Progress.start();
          axios
            .put(
              `https://60c7120919aa1e00176a0377.mockapi.io/api/todolist/${this.formData.id}`,
              params
            )
            .then((res) => {
              if (res.status === 200 || res.status === 201) {
                this.$Progress.finish();
                this.$toast("Edit work successfully", {
                  slotLeft: `<i class="el-icon-edit"></i>`,
                });
                this.handleClose();
                this.$emit("handleRefesh");
              }
            })
            .catch(() => {
              this.$Progress.fail();
              this.$toast("Edit work failed", {
                slotLeft: `<i class="el-icon-edit"></i>`,
              });
              this.handleClose();
            });
        }
        if (this.type === "delete") {
          this.$Progress.start();
          axios
            .delete(
              `https://60c7120919aa1e00176a0377.mockapi.io/api/todolist/${this.formData.id}`
            )
            .then((res) => {
              if (res.status === 200 || res.status === 201) {
                this.$Progress.finish();
                this.$toast("Delete work successfully", {
                  slotLeft: `<i class="el-icon-edit"></i>`,
                });
                this.handleClose();
                this.$emit("handleRefesh");
              }
            })
            .catch(() => {
              this.$Progress.fail();
              this.$toast("Delete work failed", {
                slotLeft: `<i class="el-icon-edit"></i>`,
              });
              this.handleClose();
            });
        }
      }

      e.preventDefault();
    },
    handleClose() {
      this.$emit("handleChangeVisible");
    },
  },
};
</script>
<style lang="scss" scoped>
.modal {
  .el-overlay {
    .el-dialog {
      &__header {
      }
      &__body {
        .form {
          &-item {
            display: flex;
            flex-direction: column;
            min-height: 50px;
            padding-top: 20px;
            label {
              text-align: left;
            }
            &__error {
              color: red;
              text-align: left;
            }
            &:nth-last-child(1) {
              display: flex;
              flex-direction: row;
              justify-content: center;
              .el-button {
                width: 100px;
                height: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>