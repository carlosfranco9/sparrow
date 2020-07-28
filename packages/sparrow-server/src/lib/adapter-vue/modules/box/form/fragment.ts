export function BoxForm (content: string) {
  return `<box-form>${content}</box-form>`;
}

export function eform (content: string = '') {
  return `
    <el-form label-width="100px">
     <div class="drag-box">${content}</div>
    </el-form>
  `;
}