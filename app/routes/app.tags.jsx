import TagMain from "../components/TagsComponents/TagMain";
import WarningBanner from "../components/Banner/WarningBanner";
import Placeholder from "../components/Placeholder";
import React, { useEffect, useState } from "react";

// for preventing a useLayoutEffect warning in console
React.useLayoutEffect = React.useEffect

export default function EmailTags() {
    const [isShowBanner, setIsShowBanner] = useState(false)

    useEffect(() => {
        fetchSmtpDetails()
    }, []);

    const fetchSmtpDetails = async () => {
        try {

            const response = await fetch('/api/getSMTPDetails', {
                method: 'GET',
                headera: {
                    "Content-Type": "application/json"
                },
            })

            if (response.ok) {
                const { data } = await response.json();
                if (data && data.length > 0) {
                    return
                } else {
                    setIsShowBanner(true)
                }
            } else {
                console.error('Failed to fetch SMTP details. Server responded with:', response.status);
                showToast('Failed to fetch SMTP details. Please try again.', 'error');
            }


        } catch (error) {
            console.error('Failed to fetch SMTP details:', error);
            showToast('Failed to fetch SMTP details. Please try again.', 'error');
        }
    };

    return (
        <>
            {isShowBanner && <Placeholder
                component={
                    <WarningBanner
                        isShow={isShowBanner}
                        setShow={setIsShowBanner}
                    />
                }
                marginTop='2rem'
                padding='1rem 16rem 0rem 14rem'
                height='auto'
                width='auto'
                marginBottom='-36px'
                itemsCentered={true}
            />}
            <TagMain />
        </>

    );
}
