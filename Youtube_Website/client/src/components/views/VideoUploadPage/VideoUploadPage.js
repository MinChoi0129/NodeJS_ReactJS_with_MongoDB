import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd'
import Dropzone from 'react-dropzone'

const { TextArea } = Input
const { Title } = Typography

const PrivateOptions = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" },
]

const CategoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" },
]

function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>동영상 업로드</Title>
            </div>

            <Form onSubmit>
                <div style={{ display: 'flex', justifyConenter: 'space-between' }}>

                    <Dropzone onDrop multiple maxSize>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{
                                width: '300px', height: '240px',
                                border: '1px solid lightgrey', display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type='plus' style={{ fontSize: '3rem' }} />
                            </div>
                        )}
                    </Dropzone>

                    <div>
                        <img scr alt />
                    </div>

                </div>

                <br />
                <br />

                <label>Title</label>
                <Input onChange={onTitleChange} value={VideoTitle} />
                <br />
                <br />

                <label>Description</label>
                <TextArea onChange={onDescriptionChange} value={Description} />
                <br />
                <br />

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                    <option key value></option>
                </select>
                <br />
                <br />

                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                    <option key value></option>
                </select>
                <br />
                <br />

                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage