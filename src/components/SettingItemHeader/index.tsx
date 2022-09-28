import { ReactNode } from "react";

export default function SettingItemHeader(props: { label: string | ReactNode, suffix?: ReactNode }) {
    return (
        <div style={{ position: 'relative' }}>
            <h4 className="settings-item-header">{props.label}</h4>
            <div className="header-suffix">
                {props.suffix}
            </div>
        </div>
    )
}
