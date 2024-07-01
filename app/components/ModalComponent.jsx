import { Modal, TextField, FormLayout, Text } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import WUSUWYG from './wuswug-files/WUSUWYG';

export default function ModalComponent({ isTrue, toggleModal, handlePrimaryAction, primaryContent, secondaryContent, title,
    value, setValue, isLoadingButton = false, modalType }) {

    const handleChange = (_v, type) => {
        setValue((prev) => ({
            ...prev,
            [type]: _v
        }))
    }

    return (
        <Modal
            open={isTrue}
            onClose={toggleModal}
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
                    <FormLayout>
                        <FormLayout.Group condensed>
                            <TextField
                                placeholder="Please enter tag name"
                                value={value.tag}
                                onChange={(_v) => handleChange(_v, 'tag')}
                                type='text'
                                label="Tag Name"
                                autoComplete="off"
                            />
                            {/* <input style={{ visibility: 'hidden' }} /> */}
                        </FormLayout.Group>
                        <FormLayout.Group condensed>
                            {/* <TextField
                                placeholder="Please enter a email message for this tag"
                                value={value.tagEmailContent}
                                onChange={(_v) => handleChange(_v, 'tagEmailContent')}
                                type='text'
                                multiline={4}
                                label="Tag Email Message"
                                autoComplete="off"
                            /> */}
                            <div>
                                <Text>Tag Email Message</Text>
                                <div style={{marginBottom: '4px'}}></div>
                                <WUSUWYG
                                    value={value.tagEmailContent}
                                    setValue={(_v) => handleChange(_v, 'tagEmailContent')}
                                    placeholder={'Please enter a email message for this tag here...'}
                                />
                            </div>

                            {/* <input style={{ visibility: 'hidden' }} /> */}

                        </FormLayout.Group>
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