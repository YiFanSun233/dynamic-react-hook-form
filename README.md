## dynamic react-hook-form

配置式表单组件

### 增加FormList

## 使用方式

```js
const schema: FormSchema = {
  type: 'object',
  properties: {
    news: {
      type: 'array',
      title: '新闻',
      transform: {
        format(value) {
          return value.map((item: any) => ({
            ...item,
            newsDate: item?.newsDate?.format('YYYY/MM/DD')
          }))
        },
      },
      item: {
        type: 'object',
        properties: {
          newsTitle: {
            title: '新闻标题',
            component: 'Text',
            required: true
          },
          newsAuthor: {
            title: '作者',
            component: 'Text'
          },
          newsDate: {
            title: '新闻日期',
            component: 'Date',
            transform: {
              format(value) {
                return value?.format('YYYY/MM/DD')
              },
            },
          }
        }
      }
    },
    date: {
      type: 'string',
      title: '日期',
      component: 'Date',
      selfProps: {
        dateConfig: {
          format: 'YYYY-MM-DD'
        }
      },
      transform: {
        format(value) {
          return value?.format('YYYY/MM/DD')
        },
      },
      column: 1
    },
    personal: {
      type: 'object',
      title: '人',
      properties: {
        school: {
          type: 'object',
          title: 'School',
          properties: {
            class: {
              type: 'string',
              title: 'Class',
              component: 'Text',
              required: true,
              selfProps: {
                placeholder: 'button'
              },
              transform: {
                output(e) {
                  const value = parseInt(e.target.value, 10)
                  if (value > 10) {
                    return 10
                  }
                  return value
                },
                input(value) {
                  return value
                },
              }
            }
          }
        },
        name: {
          type: 'string',
          title: 'Name',
          component: 'Text',
          required: 'This field is required',
          helpText: '此项为姓名',
          rules: {
            pattern: {
              value: /^[0-9]*$/,
              message: "This input is number only."
            },
          },
          selfProps: {
            placeholder: 'place input name'
          },
          transform: {
            format(value) {
              return `my name is ${value}`
            },
          },
          column: 3
        },
        sex: {
          type: 'string',
          title: 'Sex',
          component: 'Checkbox.Group',
          required: false,
          selfProps: {
            options: [
              {
                label: 'man',
                value: 'man'
              },
              {
                label: 'woman',
                value: 'woman'
              },
              {
                label: 'other',
                value: 'other'
              }
            ],
          },
          defaultValue: ['woman'],
          column: 3,
          gap: 12
        },
        age: {
          type: 'number',
          component: 'Number',
          title: 'Age',
          required: true,
          dependencies: ['personal.sex', 'personal.hobby'],
          hidden: "{{$deps[0]?.includes('other') && $deps[1] === 'eat'}}",
          column: 3
        },
        hobby: {
          type: 'string',
          component: 'Select',
          title: 'Hobby',
          required: false,
          dependencies: ['personal.age', 'personal.sex'],
          hidden: (deps) => {
            if (deps[0] > 18) return true
            if (deps[1]?.includes('other')) return true
          },
          selfProps: {
            style: {
              width: "100%"
            },
            options: [
              {
                label: 'eat',
                value: 'eat'
              }, {
                label: 'play',
                value: 'play'
              }
            ]
          }
        }
      }
    }
  },
  column: 4,
  gap: 24
}


import {Input} from 'antd'

cosnt Map = {
  Text: Input,
  ...
}


import DyanmicForm, { useDynamicForm } from '@sunfy/dynamic-react-hook-form'

function App() {
  const {form} = useDynamicForm()
  
  const handleSubmit = (values)=>{
    console.log(values)
  }

  return (
    <>
      <DyanmicForm config={{ mode: 'onSubmit' }} form={form} schemas={root} widgets={Map} onFinished={handleSubmit} />
      <Button onClick={()=>{form.current?.submit()}} style={{ marginTop: 24 }} >submit</Button>
    </>
  )
}

```

### API

#### useFormContext

同react-hook-form的useFormContext

#### useFormState

同react-hook-form的useFormState

#### useWatch

同react-hook-form的useWatch

#### useFormValues

实时获取表单的全部数据

#### useDynamicForm

返回一个form ref,上面包含react-hook-form的所有实例方法，和submit方法
