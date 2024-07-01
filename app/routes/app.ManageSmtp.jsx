import React, { useState, useEffect } from "react";
import {
    Button,
    Form,
    FormLayout,
    Text,
    TextField,
    Card,
    Page, SkeletonBodyText, Box
} from "@shopify/polaris";
import Placeholder from "../components/Placeholder";
import '../components/app.css'
import { showToast } from "../components/Toast";

export default function ManageSmtp() {
    const [isLoading, setLoading] = useState(false);
    const [smtpDetails, setSmtpDetails] = useState({
        _id: '',
        host: '',
        username: '',
        password: '',
        port: ''
    });
    const [dataNotRecieved, setDataNotReceived] = useState(true)
    const [isFormDirty, setFormDirty] = useState(false);

    useEffect(() => {
        fetchSmtpDetails()
    }, []);

    const fetchSmtpDetails = async () => {
        try {

            const response = await fetch('/api/getSMTPDetails', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            })

            if (response.ok) {
                const { data } = await response.json();
                if (data && data.length > 0) {
                    setSmtpDetails(data[0]);
                } else {
                    console.warn('No SMTP details found in response.');
                    // showToast('No SMTP details found.', 'error');
                }
                setDataNotReceived(false)
            } else {
                console.error('Failed to fetch SMTP details. Server responded with:', response.status);
                showToast('Failed to fetch SMTP details. Please try again.', 'error');
            }


        } catch (error) {
            console.error('Failed to fetch SMTP details:', error);
            showToast('Failed to fetch SMTP details. Please try again.', 'error');
        }
    };

    const handleInputChange = (value, type) => {
        setSmtpDetails(prev => ({
            ...prev,
            [type]: value
        }));
        setFormDirty(true);
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            showToast('Please fill out all fields.', 'error');
            return;
        }
        setLoading(true);

        try {
            const apiData = {
                host: smtpDetails.host,
                password: smtpDetails.password,
                port: smtpDetails.port,
                username: smtpDetails.username,
                ...(smtpDetails._id ? { _id: smtpDetails._id } : null)
            }

            const response = await fetch('/api/manageSmtp', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiData)
            })

            if (response.ok) {
                showToast('SMTP details saved successfully!');

            } else {
                showToast(response.error)
            }

        } catch (error) {
            console.error('Failed to save SMTP details:', error);
            showToast('Failed to save SMTP details. Please try again.', 'error');
        } finally {
            fetchSmtpDetails()
            setLoading(false);
            setFormDirty(false);
        }
    };

    const validateForm = () => {
        return smtpDetails.host.trim() !== '' &&
            smtpDetails.username.trim() !== '' &&
            smtpDetails.password.trim() !== '' &&
            smtpDetails.port !== ''
    };


    return (
        <Page narrowWidth>
            <div style={{ marginTop: "4rem" }}></div>
            <Card sectioned title="Login">

                <Placeholder
                    component={
                        <>
                            <Text variant="headingXl" alignment="center" as="h4">
                                SMTP Details
                            </Text>
                            <div style={{ marginTop: "1rem" }}></div>


                            {dataNotRecieved ? <Box paddingBlockStart="200">
                                <SkeletonBodyText lines={13} />
                            </Box>
                                :
                                <Form>
                                    <FormLayout>
                                        <TextField
                                            label="SMTP Host"
                                            placeholder="Please enter SMTP Host"
                                            value={smtpDetails.host}
                                            onChange={(value) => handleInputChange(value, 'host')}
                                        />

                                        <TextField
                                            label="SMTP Username"
                                            placeholder="Please enter SMTP Username"
                                            value={smtpDetails.username}
                                            onChange={(value) => handleInputChange(value, 'username')}
                                        />

                                        <TextField
                                            label="SMTP Password"
                                            placeholder="Please enter SMTP Password"
                                            type="text"
                                            value={smtpDetails.password}
                                            onChange={(value) => handleInputChange(value, 'password')}
                                        />

                                        <TextField
                                            label="SMTP Port"
                                            placeholder="Please enter SMTP Port"
                                            type="number"
                                            value={smtpDetails.port}
                                            onChange={(value) => handleInputChange(value, 'port')}
                                        />

                                    </FormLayout>

                                </Form>
                            }
                            <div className="buttonContainer">
                                <Button size="large" loading={isLoading} variant="primary"  disabled={!isFormDirty || isLoading} onClick={handleSubmit}>
                                    Save
                                </Button>
                            </div>
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
