import React, { useCallback, useState } from "react";
import {
    Button,
    Form,
    FormLayout,
    Text,
    TextField,
    Card,
    Page,
} from "@shopify/polaris";
import Placeholder from "./Placeholder";
import { showToast } from "./Toast";

export default function TagCreator() {
    const [isLoading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        tag: '',
        tagEmailContent: ''
    })

    const formInputChange = (_v, type) => {
        setFormData((prev) => ({
            ...prev,
            [type]: _v
        }))
    }

    const handleSubmit = () => {
        try {
            setLoading(true)
            console.log('handleSubmit data', formData);

            if (formData.tag.length < 1) return showToast('Tag field cannot be empty.')
            if (formData.tagEmailContent.length < 1) return showToast('Tag Email Message field cannot be empty.')

        } catch (error) {
            console.log('error while handleSubmit on Tagcreator', error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Page narrowWidth>
            <div style={{ marginTop: "4rem" }}></div>
            <Card sectioned title="Login">

                <Placeholder
                    component={
                        <>
                            <Text variant="headingXl" alignment="center" as="h4">
                                Create a Tag
                            </Text>
                            <div style={{ marginTop: "1rem" }}></div>

                            <Form>
                                <FormLayout>
                                    <Placeholder
                                        component={
                                            <TextField
                                                value={formData.tag}
                                                onChange={(v) => { formInputChange(v, 'tag') }}
                                                type="text"
                                                label="Tag Name"
                                                placeholder="Please enter tag name"
                                            />
                                        }
                                        marginTop='10px'
                                        padding='0'
                                        height='auto'
                                        width='auto'
                                        marginBottom='7px'
                                        itemsCentered={false}
                                    />


                                    <Placeholder
                                        component={
                                            <TextField
                                                value={formData.tagEmailContent}
                                                onChange={(v) => { formInputChange(v, 'tagEmailContent') }}
                                                type={"text"}
                                                label="Tag Email Message"
                                                placeholder="Please enter a email message for this tag"
                                                multiline={4}
                                                autoComplete="off"

                                            />
                                        }
                                        marginTop='0'
                                        padding='0'
                                        height='auto'
                                        width='auto'
                                        marginBottom='-10px'
                                        itemsCentered={false}
                                    />


                                    <Placeholder
                                        component={
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Button size="large" loading={isLoading} primary onClick={handleSubmit} >
                                                    Submit
                                                </Button>
                                            </div>

                                        }
                                        marginTop='12px'
                                        padding='auto'
                                        height='auto'
                                        width='auto'
                                        marginBottom='0px'
                                        itemsCentered={false}
                                    />

                                </FormLayout>
                            </Form>
                        </>
                    }
                    marginTop='0'
                    padding='50px'
                    height='auto'
                    width='auto'
                    marginBottom='0'
                    itemsCentered={false}
                />


            </Card>
        </Page>
    );
}
