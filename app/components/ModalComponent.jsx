import { Modal, TextField, FormLayout, Text } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import WUSUWYG from './wuswug-files/WUSUWYG';

export default function ModalComponent({ isTrue, toggleModal, handlePrimaryAction, primaryContent, secondaryContent, title,
    value, setValue, isLoadingButton = false, modalType }) {

    const handleChange = (_v, type) => {
        setValue((prev) => ({
            ...prev,
            [type]: _v
        }))
    }


    useEffect(() => {
        const tempDiv = document.getElementById("emailContent");
        if(tempDiv){
            tempDiv.innerHTML = value.tagEmailContent
        }
    }, [value.tagEmailContent])


    return (
        <Modal
            open={isTrue}
            onClose={toggleModal}
            size='large'
            title={modalType === 'delete' ? 'Confirmation' : title}
            primaryAction={{
                content: modalType === 'delete' ? 'Delete' : primaryContent,
                onAction: handlePrimaryAction,
                loading: isLoadingButton,
                destructive: modalType === 'delete' ? true : false
            }}
            secondaryActions={[
                {
                    content: secondaryContent,
                    onAction: toggleModal,
                },
            ]}
        >
            <Modal.Section>
                {modalType !== 'delete' ?
                    // <FormLayout>
                    //     <FormLayout.Group condensed>
                    //         <TextField
                    //             placeholder="Please enter tag name"
                    //             value={value.tag}
                    //             onChange={(_v) => handleChange(_v, 'tag')}
                    //             type='text'
                    //             label="Tag Name"
                    //             autoComplete="off"
                    //         />
                    //         {/* <input style={{ visibility: 'hidden' }} /> */}
                    //     </FormLayout.Group>
                    //     <FormLayout.Group condensed>
                    //         {/* <TextField
                    //             placeholder="Please enter a email message for this tag"
                    //             value={value.tagEmailContent}
                    //             onChange={(_v) => handleChange(_v, 'tagEmailContent')}
                    //             type='text'
                    //             multiline={4}
                    //             label="Tag Email Message"
                    //             autoComplete="off"
                    //         /> */}
                    //         <div>
                    //             <Text>Tag Email Message</Text>
                    //             <div style={{marginBottom: '4px'}}></div>
                    //             <WUSUWYG
                    //                 value={value.tagEmailContent}
                    //                 setValue={(_v) => handleChange(_v, 'tagEmailContent')}
                    //                 placeholder={'Please enter a email message for this tag here...'}
                    //             />
                    //         </div>

                    //         {/* <input style={{ visibility: 'hidden' }} /> */}

                    //     </FormLayout.Group>
                    // </FormLayout>

                    <FormLayout>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1 }}>
                                <FormLayout.Group condensed>
                                    <TextField
                                        placeholder="Please enter tag name"
                                        value={value.tag}
                                        onChange={(_v) => handleChange(_v, 'tag')}
                                        type='text'
                                        label="Tag Name"
                                        autoComplete="off"
                                    />
                                </FormLayout.Group>
                                <FormLayout.Group condensed>
                                    <div style={{ marginTop: "10px" }}>
                                        <Text>Tag Email Message</Text>
                                        <div style={{ marginBottom: '4px' }}></div>
                                        <WUSUWYG
                                            value={value.tagEmailContent}
                                            setValue={(_v) => handleChange(_v, 'tagEmailContent')}
                                            placeholder={'Please enter an email message for this tag here...'}
                                        />
                                    </div>
                                </FormLayout.Group>
                            </div>
                            <div style={{ flex: 1, marginLeft: '20px' }}>
                                {/* Right side for email preview */}
                                <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '200px' }}>
                                    <h3>Email Preview</h3>
                                    {/* Render your email preview content here */}
                                    <div id="emailContent">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormLayout>

                    :
                    <Text>
                        Are you sure you want to delete.
                    </Text>
                }
            </Modal.Section>
        </Modal>
    );
}