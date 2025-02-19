import React, { useEffect, useRef, useState } from 'react'
import { Text, Button } from '@shopify/polaris'
import TagTable from './TagTable';
import './TagMain.css'
import { showToast } from '../Toast';
import { PlusIcon } from '@shopify/polaris-icons';
import table_logo from '/email-tag-table-logo-removebg-preview.png'
import ModalComponent from '../ModalComponent';
import styles from '../../routes/_index/styles.module.css'

export default function TagMain() {
    const [isLoading, setLoading] = useState(false)
    const [isActionLoading, setActionLoading] = useState(false)
    const [formData, setFormData] = useState({
        tag: '',
        tagEmailContent: ''
    })
    const [tagData, setTagData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 4
    const isInitialRender = useRef(true);
    const [action, setAction] = useState({
        actionID: '',
        actionType: '',
        isAction: ''
    })

    useEffect(() => {
        setLoading(true)

        const fetchOnlyFirstTime = async () => {
            await fetchTagData();
            setLoading(false)
        }
        fetchOnlyFirstTime()
    }, []);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        console.log('totalPages', totalPages);
        fetchTagData();
    }, [currentPage]);

    const fetchTagData = async () => {
        console.log('hit fetchTagData');

        try {

            const response = await fetch(`/api/getTagsData/${itemsPerPage}/${currentPage}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (response.ok) {
                const { data, hasNextPage, hasPrevPage, totalPages } = await response.json()
                // showToast(message)
                // console.log(' data, hasNextPage, hasPrevPage, totalItems, limit ', data, hasNextPage, hasPrevPage, totalItems, limit );
                setTagData(data)
                setHasNextPage(hasNextPage)
                setHasPrevPage(hasPrevPage)
                setTotalPages(totalPages);
            }

        } catch (error) {
            console.log('error', error);
        }
    }

    const handleSubmit = async () => {
        try {


            if (formData.tag.length < 1) return showToast('Tag field cannot be empty.')
            if (formData.tagEmailContent.length < 1) return showToast('Tag Email Message field cannot be empty.')
            setActionLoading(true)
            console.log('handleSubmit data', formData);
            const FormData = {
                ...formData,
                ...(action.actionType === 'create' ? { createdAt: new Date() } : null)
            }

            const response = await fetch(`/api/actionTag`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    FormData,
                    idToUpdate: action.actionID
                })
            })

            if (response.ok) {
                const { message } = await response.json()
                showToast(message)
                setActionLoading(false)
                setFormData({
                    tag: '',
                    tagEmailContent: ''
                })
                fetchTagData()

            }
            handleToggleModal(false)
        } catch (error) {
            console.log('error while handleSubmit on TagMain', error);
        }
    }

    const handleToggleModal = (isAction, type, id) => {
        console.log('handleToggleModal isAction, type, id', isAction, '  ', type, '   ', id);
        if (type === 'edit') {
            const dataToUpdate = tagData.filter(d => d._id === id)[0]
            console.log('dataToUpdate', dataToUpdate);
            setFormData({
                tag: dataToUpdate.tag,
                tagEmailContent: dataToUpdate.tagEmailContent
            })
        }

        if (isAction === false) {
            setFormData({
                tag: '',
                tagEmailContent: ''
            })
        }

        setAction({
            actionID: id ?? '',
            actionType: type ?? '',
            isAction
        })
    }

    const calculateItemNumber = (index) => {
        return (currentPage - 1) * itemsPerPage + index + 1;
    };

    const handleDeleteTag = async () => {
        try {
            setActionLoading(true)

            const response = await fetch(`/api/deleteTagData`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ actionID: action.actionID })
            })

            if (response) {
                const { message } = await response.json()
                showToast(message)
                setActionLoading(false)

            }

        } catch (error) {
            console.log('error while deleting tag', error);
        } finally {
            handleToggleModal(false)
            fetchTagData()
        }
    }

    return (
        <>
            <div className='clockTableHeading' style={{ marginBottom: '1.5rem' }}>
                <Text variant="headingXl" as="h4">
                    {/* <span className='headingTextColor'>Tags Table</span> */}
                    <img style={{marginBottom: "-1em"}} className={styles[`app-logo`]} src={table_logo} alt="email-tags-table-logo" />
                </Text>
            </div>
            <div className='paddingOutsideTable'>
                <div className="apply_button">
                    <Button variant="primary" onClick={() => handleToggleModal(true, 'create')} icon={PlusIcon}>Create New Tag</Button>
                </div>
                <div className='table-container'>

                    <div className='card-table'>

                        <section style={{ display: 'block' }}>
                            <TagTable
                                tagData={tagData}
                                isLoading={isLoading}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                                hasNextPage={hasNextPage}
                                hasPrevPage={hasPrevPage}
                                calculateItemNumber={calculateItemNumber}
                                handleToggleModal={handleToggleModal}
                            />
                        </section>
                    </div>

                </div>
            </div>


            <ModalComponent
                isTrue={action.isAction}
                toggleModal={() => handleToggleModal(false)}
                handlePrimaryAction={() => action.actionType === 'delete' ? handleDeleteTag() : handleSubmit()}
                primaryContent={action.actionType === 'create' ? 'Save' : 'Update'}
                modalType={action.actionType}
                secondaryContent={'Cancel'}
                title={`Please ${action.actionType === 'edit' ? "update" : "add"} a tag name and tag associated email.`}
                value={formData}
                setValue={setFormData}
                isLoadingButton={isActionLoading}
            />
        </>
    )
}