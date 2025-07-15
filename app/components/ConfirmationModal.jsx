
export default function ConfirmationModal({ id, title, primaryButtonTitle, secondaryButtonText, primaryAction, secondaryAction, component }) {
    return (
        <ui-modal id={id}>
            {component}
            <ui-title-bar title={title}>
                <button variant="primary" onClick={primaryAction}>{primaryButtonTitle}</button>
                <button onClick={secondaryAction}>{secondaryButtonText}</button>
            </ui-title-bar>
        </ui-modal>
    )
}
