import { VariantType, useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import $bus from './bus'

export default function MSG() {
    const { enqueueSnackbar } = useSnackbar();
    const msgSender = (type: VariantType, msg: string) => {
        enqueueSnackbar(msg, { variant: type });
    };
    useEffect(() => {
        $bus.addListener('msgSender', msgSender);
        return () => {
            $bus.removeListener('msgSender', msgSender);
        };
    })

    return (
        <React.Fragment></React.Fragment>
    )
}

const message = {
    default: (msg: string) => {
        $bus.emit('msgSender', 'default', msg)
    },
    error: (msg: string) => {
        $bus.emit('msgSender', 'error', msg)
    },
    success: (msg: string) => {
        $bus.emit('msgSender', 'success', msg)
    },
    warning: (msg: string) => {
        $bus.emit('msgSender', 'warning', msg)
    },
    info: (msg: string) => {
        $bus.emit('msgSender', 'info', msg)
    }
}

export { message }