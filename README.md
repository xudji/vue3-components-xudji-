# Vue3 组件封装 by xudji 
## Btable表格组件

### 使用方式

```html
 <TableSearch :search="state.tableData.search" @search="onSearch" />
      <Table
        ref="tableRef"
        v-bind="state.tableData"
        class="table-demo"
        @delRow="onTableDelRow"
        @pageChange="onTablePageChange"
        @sortHeader="onSortHeader"
      />
```

### 参数

- search：搜索表单数组，包含每个搜索项的 label、prop、placeholder、required 和 type 等信息；
- tableData：表格数据对象，包含 data、header、config、search、param 和 printName 属性。其中，
  - data：表格中显示的数据数组；
  - header：表格列头信息数组，包含 key、colWidth、title、type 和 isCheck 等属性；
  - config：表格配置信息，包含 total、loading、isBorder、isSerialNo、isSelection 和 isOperate 等属性；
  - search：搜索参数数组，与 search 表单数组一一对应；
  - param：请求后台时传递的参数；
  - printName：表格打印时的标题。

### 方法

1. `delRow`：用于删除当前行的方法
2. `pageChange`：用于分页切换时触发的方法
3. `sortHeader`：用于拖拽表头排序后触发的方法

### 使用逻辑

这是一个基于 Vue.js 的表格组件，包括搜索功能、分页功能、表头排序功能和列选择功能等。使用者可以根据需要配置表格的列数据和搜索表单数据，通过异步请求数据来填充表格。具体使用逻辑如下：

1. 引入 Btable 组件和 TableSearch 组件
2. 定义变量，包括表格数据、搜索表单数据等
3. 定义初始化列表数据的方法 `getTableData`
4. 定义搜索回调函数 `onSearch`，在用户点击搜索按钮时更新搜索参数并调用 `getTableData`
5. 定义删除当前项回调函数 `onTableDelRow`，在用户点击删除按钮时删除当前行数据并重新获取列表数据
6. 定义分页回调函数 `onTablePageChange`，在用户改变页码时更新分页参数并调用 `getTableData`
7. 定义表头排序回调函数 `onSortHeader`，在用户拖动表头排序时更新表头数据
8. 在页面加载时调用 `getTableData` 方法初始化列表数据
9. 在模板中使用 `Table` 组件和 `TableSearch` 组件，并绑定相应事件和数据。

### 封装的功能

1. 表格内容和表头的传入功能
2. 表格的配置项传入功能
3. 可以设置是否显示边框
4. 可以设置表格行是否为斑马条纹样式
5. 可以设置是否显示多选框
6. 可以设置是否显示序号列
7. 可以设置表格列宽度和表头的显示标题
8. 可以在单元格中显示图片或文字
9. 可以设置是否显示操作列和操作按钮
10. 可以删除表格中的一行数据
11. 可以进行分页查询并通过事件向父组件传递分页的参数
12. 可以自定义打印表格内容
13. 可以导出表格内容到 Excel 文件
14. 可以刷新表格数据
15. 可以设置表格的显示列并实现拖拽排序
16. 可以在前端实现排序，并通过事件将排序后的表头信息向父组件传递

### 封装的逻辑

1. 使用 defineProps 定义父组件传入的 props，包括 data（列表数据）、header（表头数据）、config（配置项）和 printName（打印标题）。
2. 使用 defineEmits 定义子组件向父组件传值/事件，包括 delRow 和 pageChange。
3. 使用 reactive 定义状态对象 state，包括当前页码 pageNum 和每页显示的数量 pageSize、选中的列表 selectlist、列显示的全选状态 checkListAll 和不确定状态 checkListIndeterminate。
4. 使用 computed 计算属性设置表格边框显示/隐藏的状态 setBorder、获取配置项的状态 getConfig 和 tool header 数据的状态 setHeader。
5. 定义 onCheckAllChange 和 onCheckChange 函数，用于处理列显示的全选和单选，以及对应的状态修改。
6. 定义 onSelectionChange 函数，用于处理表格多选改变时的逻辑，保存选中的列表。
7. 定义 onDelRow 函数，用于处理删除当前项的逻辑，使用 emit 触发父组件的 delRow 事件并传递被删除的数据行。
8. 定义 onHandleSizeChange 和 onHandleCurrentChange 函数，用于处理分页改变的逻辑，分别更改 state 中的 pageNum 和 pageSize，并使用 emit 触发父组件的 pageChange 事件并传递新的分页信息。
9. 定义 pageReset 函数，用于搜索时将分页还原成默认状态，设置 pageNum 为 1、pageSize 为 10，并使用 emit 触发父组件的 pageChange 事件。
10. 定义 onPrintTable 函数，用于处理打印表格的逻辑。先拼接表格的 HTML 结构，然后使用 printJs 库进行自定义打印，并指定 css 样式。
11. 定义 onImportTable 函数，用于处理导出表格的逻辑。先判断是否选择了要导出的数据，然后使用 js-table2excel 库将数据导出为 Excel 文件。
12. 定义 onRefreshTable 函数，用于处理刷新表格的逻辑，使用 emit 触发父组件的 pageChange 事件。
13. 定义 onSetTable 函数，用于处理设置表格的逻辑。使用 Sortable.js 库实现列的拖拽排序，并保存最终的 header 数据，并使用 emit 触发父组件的 sortHeader 事件。
14. 使用 defineExpose 暴露 pageReset 方法，使得父组件能够调用该方法将分页还原成默认状态。
15. 编写模板代码，包括展示数据的表格、分页、工具栏按钮等。在表格列的模板中，根据列的类型（text 或 image）展示不同的内容。

## Bform表单组件

### 使用方式

```html
 <Baseform
      ref="form"
      label-width="100px"
      :options="options"
      @on-change="handleChange"
      @before-upload="handleBeforeUpload"
      @on-preview="handlePreview"
      @on-remove="handleRemove"
      @before-remove="beforeRemove"
      @on-success="handleSuccess"
      @on-exceed="handleExceed"
    >
      <template #uploadArea>
        <el-button type="primary" size="small">点击上传</el-button>
      </template>
      <template #uploadTip>
        <div style="color: #ccc; font-size: 12px">
          大小不超过500KB的jpg/png文件。
        </div>
      </template>
      <template #action="scope">
        <el-button type="primary" @click="submitForm(scope)">提 交</el-button>
        <el-button @click="resetForm">重 置</el-button>
      </template>
    </Baseform>
```

### 参数

- options：表单配置项，数组类型，每个元素为一个对象，对象内包含该表单项的各种属性，比如type、value、label、prop等。具体来说，options数组中的每个元素（对象）包含以下属性：
  - type：表单项的类型，包括input、select、checkbox-group、radio-group、upload、editor等。
  - value：表单项的默认值。
  - label：表单项的标签文本。
  - prop：表单项的字段名，用于表单提交时识别该项的值。
  - rules：表单项的校验规则，可以为一个数组，每个元素是一个对象，包含校验规则的具体内容，如required、min、max等。
  - attrs：表单项的其它属性，以对象形式传递。
- ref：表单的引用，用于获取表单实例并调用其相应方法。通过ref绑定表单的引用，然后可以在代码中使用例如form.value.resetFields()这样的语法来调用表单实例上的resetFields方法。

### 方法

- @on-change：表单值改变时触发的事件，传递的参数为表单中所有输入组件的值。例如，在options数组中某个表单项设置了响应式属性v-model，则该表单项的值发生变化时，会触发@on-change事件，并将表单中所有输入组件的当前值作为参数传递给该事件。
- @before-upload：点击上传前触发的事件，传递的参数为上传文件的相关信息。例如，在options数组中某个表单项设置了type为upload，则点击上传按钮时，会触发@before-upload事件，并将上传文件的相关信息作为参数传递给该事件。
- @on-preview：点击预览已上传的文件时触发的事件，传递的参数为被点击的文件对象。例如，在options数组中某个表单项设置了type为upload，并且允许预览已上传的文件，则在上传完成后点击文件列表中某个文件的预览按钮时，会触发@on-preview事件，并将预览文件的对象作为参数传递给该事件。
- @on-remove：删除已上传的文件时触发的事件，传递的参数为被删除的文件对象以及当前列表中的所有文件。例如，在options数组中某个表单项设置了type为upload，则在上传完成后可以删除已上传的文件，当点击删除按钮时，会触发@on-remove事件，并将被删除的文件对象以及当前列表中的所有文件作为参数传递给该事件。
- @before-remove：删除已上传的文件前触发的事件，传递的参数为被删除的文件对象。例如，在options数组中某个表单项设置了type为upload，则在上传完成后可以删除已上传的文件，当点击删除按钮时会先触发该事件，若事件返回值为真则继续执行删除操作，否则取消删除。
- @on-success：文件上传成功后触发的事件，传递的参数为服务器返回的响应数据。例如，在options数组中某个表单项设置了type为upload，上传完成后会触发@on-success事件，并将服务器返回的响应数据作为参数传递给该事件。
- @on-exceed：超出限制个数或大小时触发的事件，传递的参数为文件信息。例如，在options数组中某个表单项设置了type为upload，且设置了上传文件的最大个数或最大大小，则当上传的文件个数或大小超过限制时，会触发@on-exceed事件，并将文件信息作为参数传递给该事件。

- validate：验证表单是否通过校验，参数为一个回调函数，该回调函数的参数为布尔类型，表明是否通过校验。例如，在点击提交按钮时，可以调用form.value.validate()方法对表单进行校验，校验通过则执行回调函数中的代码，否则提示用户“表单填写错误”。
- resetFields: 重置表单，清空所有输入组件的值，并取消校验状态。当点击重置按钮时，可以调用form.value.resetFields()方法来清空表单中所有输入组件的值以及校验状态。

### 使用逻辑

这是一个基于 Element Plus 和 wangeditor 的表单组件，支持各种表单项类型，其中还包含上传和富文本编辑器类型。

1. 引入组件：在Vue项目中引入该表单组件。
2. 定义表单项：根据需要，定义要使用的表单项，包括输入框、下拉框、复选框、单选框、上传文件等。
3. 编写表单模板：在页面中编写表单模板，在模板中使用组件，并将定义好的表单项传递给组件作为参数。同时可以自定义表单项的提示文字和样式。
4. 编写事件处理函数：根据需求编写表单提交、重置、文件上传等事件处理函数。
5. 使用表单组件：在Vue实例中，将定义好的表单模板渲染到页面中。
6. 处理表单数据：在表单数据验证通过后，会调用表单提交事件处理函数，并将表单数据传递给父组件进行处理。
7. 其他功能：该组件还提供了取消上传、文件预览、文件删除等功能，可以根据需要进行使用。

总体来说，使用逻辑就是根据需求定义表单项、编写表单模板和事件处理函数，然后通过组件将表单渲染到页面上，最后处理表单数据并完成相应的操作。

### 封装的逻辑

1. 组件接收 `options` 属性作为输入，类型为一个包含表单项信息的数组。对于每个表单项，包括 `prop` 值（表单项数据的属性名）、`type` 值（表单项类型）、`label` 值（表单项标签名）、`attrs` 值（表单项属性）和 `rules` 值（表单项验证规则）等信息。
2. 在组件模板中使用 Element Plus 的 Form 组件渲染表单，并根据提供的 `options` 数组动态生成表单项。使用 `v-for` 循环遍历 `options` 数组并根据遍历到的表单项的 `type` 值渲染不同类型的表单元素。
3. 对于上传组件和富文本编辑器组件等特殊表单项，需要引入第三方插件并在组件内定义相应的事件方法。例如，在上传组件中，需要给 `el-upload` 组件的 `on-preview`、`on-remove`、`on-success`、`on-error`、`on-progress`、`on-change`、`before-upload`、`before-remove` 和 `on-exceed` 事件分别赋值相应的函数；在富文本编辑器组件中，则需要初始化`@wangeditor/editor` 编辑器，并将它和工具栏 `createToolbar` 关联起来。
4. 提供表单验证、重置表单和获取表单数据等常用方法。使用 Vue3 的 `defineExpose` 暴露这些方法给父组件调用。在组件内部，定义 `resetFields`、`validate` 和 `getFormData` 方法分别用于重置表单、验证表单和获取表单数据。
5. 监听 `options` 数组变化，当配置数组发生变化时重新渲染表单，保证动态更新表单项。通过 `watch` 监听 `options` 的变化，并在回调函数中调用 `initForm` 方法重新初始化表单。
6. 使用 TypeScript 进行类型定义和校验，提高代码的可读性和健壮性。通过 `defineProps` 定义输入属性的类型，通过 `defineEmits` 定义输出事件的类型。在组件内部，使用 `let` 关键字定义局部状态，并使用 `ref` 创建响应式对象。使用 `onMounted` 钩子函数在组件挂载时调用 `initForm` 方法进行初始化。同时，在代码中使用注释对关键操作进行说明，并为组件和函数添加适当的注释说明。

## BformDialog对话框表单组件

### 使用方式

```html
<el-button type="primary" @click="open">open</el-button>
    <BformDialog
      ref="formDialog"
      title="编辑"
      v-model:visible="visible"
      :options="options"
      :on-change="handleChange"
      :on-success="handleSuccess"
    >
      <template #uploadArea>
        <el-button size="small" type="primary">点击上传</el-button>
      </template>
      <template #uploadTip>
        <div style="color: #ccc; font-size: 12px; margin-left: 4px">
          大小不超过500KB的jpg/png文件。
        </div>
      </template>
      <template #footer="{ form }">
        <span class="dialog-footer">
          <el-button @click="Cancel">取 消</el-button>
          <el-button type="primary" @click="Confirm(form)">确 认</el-button>
        </span>
      </template>
    </BformDialog>
```

### 参数

- visible：Boolean 类型，用于控制弹窗的可见性，初始值为 false。
- options：Array 类型，表示表单的配置项，其中每一项代表一个表单元素的配置，包含如下属性：
  - type：String 类型，必选，表示表单元素的类型，包含 input、select、radio-group、checkbox-group、upload、editor 等。
  - value：任意类型，必选，表示表单元素的值。
  - label：String 类型，必选，表示表单元素的标签名称。
  - prop：String 类型，必选，表示表单元素的字段名称。
  - rules：Array 类型，可选，表示表单元素的校验规则。具体规则可以参考 ElementUI 表单校验规则。
  - attrs：Object 类型，可选，表示表单元素的其他属性，如 input 的 clearable 属性等。
  - children：Array 类型，可选，表示下拉框、单选框、多选框等子元素的配置项，与父级元素具有相同的属性。

### 方法

- open：点击“打开”按钮时触发的方法，将 visible 的值设置为 true，从而显示表单弹窗。
- Cancel：点击“取消”按钮时触发的方法，将 visible 的值设置为 false，从而隐藏表单弹窗，并通过 formDialog.value.resetFields() 方法重置表单。
- Confirm：点击“确认”按钮时触发的方法，用于提交表单数据。该方法需接收一个参数 form，表示当前表单实例。首先执行 form.validate() 方法进行表单校验，若校验通过，则控制台输出表单数据，并将 visible 的值设置为 false，从而隐藏表单弹窗。否则，提示校验失败。
- handleSuccess：表单提交成功时触发的回调函数，接收一个参数 val，表示表单提交的数据。
- handleChange：表单数据发生改变时触发的回调函数，接收一个参数 val，表示变化后的表单数据。		

### 使用逻辑

1. 通过点击“打开”按钮打开表单弹窗。
2. 表单包括用户名、密码、职位、爱好、性别、上传和描述等多项表单元素。
3. 用户可以填写这些表单元素，并上传文件。
4. 点击“确认”按钮提交表单。
5. 如果表单验证成功，则会弹出“验证成功”的提示信息并控制弹窗关闭，并在控制台输出表单的填写内容。
6. 如果表单验证失败，则会弹出“验证失败”的提示信息。
7. 如果用户点击“取消”按钮，则会将表单重置。

### 封装的功能

封装了一个弹窗表单组件BformDialog。该组件通过可选属性(visible)控制弹窗的显示和隐藏。在表单中包括多项表单元素，可以通过options属性传递表单配置选项，然后根据配置选项生成表单。同时在表单中也可以上传文件。用户可以填写这些表单元素，并上传文件，然后点击“确认”按钮提交表单。如果表单验证成功，则会执行onSuccess方法，否则会弹出验证失败的提示信息。如果用户点击“取消”按钮，则会将表单重置。此外，还支持自定义上传区域和上传提示文字，以及传递其他方法（如beforeUpload,onPreview等）处理上传事件。组件里面还封装了resetFields方法，可以用来重置表单。

1. 显示和隐藏弹窗。
2. 根据配置选项生成表单。
3. 上传文件。
4. 验证表单，提交表单，并执行相应的方法（如onSuccess）。
5. 自定义上传区域和上传提示文字。
6. 可传递其他方法（如beforeUpload,onPreview等）处理上传事件。
7. 重置表单。

### 封装逻辑

1. 引入了"vue"中的一些函数和类型定义，并引用了自己定义的"Bform"组件。
2. 定义了props、emits、dialogVisible以及form变量，并初始化form为null。
3. 定义了resetFields方法来重置表单。
4. 通过watch监听props.visible的变化并将其赋值给dialogVisible，可以通过v-model绑定visible属性来控制弹窗的显示和隐藏。
5. 通过watch监听dialogVisible的变化，并通过emit方式向父组件传递，使visible属性跟着改变。
6. Bform组件是表单组件，接受一个options属性作为表单配置项，还可以传入一些上传文件相关的处理方法（如beforeUpload、onPreview等）。
7. 在Bform组件中，使用了slot插槽来自定义上传区域和上传提示文字。
8. 通过ref获取表单实例，然后注册@on-change事件来监听表单输入内容的变化并进行表单验证，如果表单验证成功则会调用onSuccess方法，并将表单数据作为参数传入，如果表单验证失败则会弹出验证失败的提示信息。
9. 最后在弹窗dialog中，将Bform组件作为插槽的默认值，并将表单实例form对应到弹窗底部插槽中的slot插槽中，方便在父组件中自定义提交按钮等。

## BnoticeBar滚动通知栏组件

### 使用方式

```html
 <el-card shadow="hover" header="滚动通知栏：默认">
      <NoticeBar :text="state.text" />
    </el-card>

    <el-card shadow="hover" header="滚动通知栏：设置样式" class="mt15">
      <NoticeBar
        :text="state.text"
        background="#ecf5ff"
        color="#409eff"
        leftIcon
        rightIcon
      >
        <template v-slot:leftIcon>
          <Bell />
        </template>
        <template v-slot:rightIcon>
          <ArrowRight />
        </template>
      </NoticeBar>
    </el-card>

    <el-card
      shadow="hover"
      header="滚动通知栏：搭配 NoticeBar 和 Carousel 走马灯 组件可以实现垂直滚动的效果"
      class="mt15"
    >
      <NoticeBar :scrollable="true">
        <el-carousel
          height="40px"
          direction="vertical"
          :autoplay="true"
          indicator-position="none"
          :interval="3000"
        >
          <el-carousel-item v-for="v in state.noticeList" :key="v"
            >{{ v }}
          </el-carousel-item>
        </el-carousel>
      </NoticeBar>
    </el-card>
```

### 参数

| 属性         | 类型              | 说明                                                         |
| :----------- | :---------------- | :----------------------------------------------------------- |
| `mode`       | `string`          | 通知栏模式，用于右侧图标点击，可选值：`closeable`（可关闭模式）或 `link`（链接模式） |
| `text`       | `string`          | 通知文本内容，当 `scrollable` 属性为 `false` 时生效          |
| `color`      | `string`          | 通知文本颜色                                                 |
| `background` | `string`          | 通知背景色                                                   |
| `size`       | `number`/`string` | 字体大小，单位为像素                                         |
| `height`     | `number`/`string` | 通知栏高度，单位为像素                                       |
| `delay`      | `number`/`string` | 动画延迟时间，单位为秒，用于滚动模式                         |
| `speed`      | `number`/`string` | 滚动速率，单位为像素每秒，用于滚动模式                       |
| `scrollable` | `boolean`         | 是否开启垂直滚动                                             |
| `leftIcon`   | `boolean`         | 是否显示自定义左侧图标                                       |
| `rightIcon`  | `boolean`         | 是否显示自定义右侧图标                                       |

### 方法

| 事件名称 | 说明                                        |
| :------- | :------------------------------------------ |
| `close`  | 通知栏模式(`mode`)为 `closeable` 时回调事件 |
| `link`   | 通知栏模式(`mode`)为 `link` 时回调事件      |

### 使用的逻辑

该组件实现了一个定制化的滚动通知栏，并提供自定义样式和图标、动画滚动等功能。

1. 使用reactive函数定义state对象，包含了一些变量和参数的初始值。
2. 在模板中使用NoticeBar组件，并通过属性绑定设置相应的参数、样式和其他选项。
3. 使用具名插槽slot和template标签定义左右图标的显示内容。
4. 搭配Carousel走马灯组件实现垂直滚动效果，展示列表中的数据。
5. 根据需要对组件进行事件监听和处理，实现交互功能。

### 封装的功能

1. 自定义背景色、字体颜色、字体大小、高度等样式；
2. 支持文本滚动和固定文本两种显示方式；
3. 可以自定义左侧和/或右侧图标；
4. 可以设置通知栏模式（可关闭或可链接），并响应右侧图标点击事件；
5. 当滚动模式开启时，文本内容可以是多个标签的组合，并且支持自动滚动的动画效果。

### 封装的逻辑

1. 参数的接收和检查

组件通过Vue的defineProps函数获取父组件传递的参数，根据参数类型、默认值等进行检查，并存储在props变量中，以供组件内部使用。

2. 样式和图标的设定

组件内部设置了background、color、height、size等样式参数，可以通过父组件传入相应的值进行设置。同时，组件还提供了自定义左右图标的功能，可以通过leftIcon和rightIcon参数选择是否使用自定义图标。

3. 动画初始化和播放

当props中的scrollable为true时，通知栏采用插槽的形式展示，不需要动画效果。当scrollable为false时，需要采用动画滚动通知内容，此时调用initAnimation函数进行动画初始化。具体做法是计算通知文本和通知条宽度，生成CSS动画并通过document.styleSheets[0].insertRule()添加到页面样式表中，最后调用changeAnimation实现动画播放循环。

4. 右侧图标点击事件

当右侧图标被点击时，根据mode的值来触发不同的事件。如果mode为closeable，则设置state.isMode为true并emit一个名为close的事件；如果mode为link，则emit一个名为link的事件。

5. 模板、脚本、样式

组件的模板、脚本、样式分别采用了template、script、style的写法，符合Vue组件开发的规范。

