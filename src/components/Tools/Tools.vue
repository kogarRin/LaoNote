<script setup>
import toolsIndex from "@/src/js/tools/toolsIndex.js";

</script>

<template>
  <div class="toolsContainer">
    <el-scrollbar :always="true">
      <el-space
          style="width: 100%; height: 90vh;"
          direction="vertical"
          fill
      >
        <el-card>
          <div class="toolsItemsContainer">
            <div class="itemsParts">
              <el-collapse accordion>
                <el-collapse-item v-for="parts in toolsIndex" :title="parts.className">
                  <div class="itemsCard">
                    <a v-for="tool in parts.tools" :href="tool.url" target="_blank">
                      <el-card>
                        <div>
                          <h4 :style="`color: rgba(${tool.cardColorRgba});`">{{tool.name}}</h4>
                        </div>
                        <div>
                          <p>{{tool.description}}</p>
                        </div>
                      </el-card>
                    </a>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </el-card>
      </el-space>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
  .toolsContainer{
    width: 100%;
    padding: .5em;

    .itemsParts{
      margin-bottom: 2em;
      text-align: left;

      & h4{
        margin: 0;
      }

      .itemHeader{
        display: flex;
        margin-bottom: 1em;

        & div{
          margin-right: .5em;
        }
      }

      .el-collapse-item__title{
        font-size: large;
      }
    }

    .itemsCard{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 1em;

      & a{
        text-decoration: none;

        &:hover{
          scale: 0.95;
          z-index: 999;
          transition: all 0.1s ease-in-out;
        }
      }

      & h4{
        margin: 0;
      }

      & p{
        margin: 0;
      }

      & div{
        margin-bottom: .5em;
      }
    }
  }
</style>
