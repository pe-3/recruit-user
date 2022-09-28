import React, { Component, ReactNode } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

type listItem = { content: ReactNode | string, onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, popupState: any) => void, color?: string };

interface Props {
    children?: ReactNode,
    lists: listItem[],
    showVersion?: boolean,
    pos?: 'left',
    size?: 'large' | 'middle' | 'small'
}
export default class DropdownMenu extends Component<Props, {}> {
    render() {
        const { lists, showVersion, size } = this.props;
        const minWidth = (() => {
            if (size === 'large') {
                return '17rem';
            } else if (size === 'small') {
                return '9rem';
            } else if (size === 'middle' || size === undefined) {
                return '13rem';
            }
        })()
        const padding = (()=>{
            if (size === 'large') {
                return '8px';
            } else if (size === 'small') {
                return '4px';
            } else if (size === 'middle' || size === undefined) {
                return '6px';
            }
        })()
        return (
            <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => {
                    return (
                        <React.Fragment>
                            <div
                                {...bindTrigger(popupState)}
                            >
                                {this.props.children}
                            </div>
                            <Menu
                                {...bindMenu(popupState)}
                                sx={{
                                    marginTop: '5px',
                                    '& .MuiPaper-root': {
                                        bgcolor: 'var(--color-background-compact-menu)',
                                        backdropFilter: 'blur(10px)',
                                        boxShadow: '0 0.25rem 0.5rem 0.125rem var(--color-default-shadow)',
                                        borderRadius: '0.75rem',
                                        minWidth,
                                        zIndex: '21',
                                        '& .MuiMenu-list': {
                                            bgcolor: 'transparent',
                                            padding,
                                        },
                                    },
                                }}
                                transformOrigin={this.props.pos === 'left' ? { horizontal: 'right', vertical: 'top' } : {
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                anchorOrigin={this.props.pos === 'left' ? { horizontal: 'right', vertical: 'bottom' } : {
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                {lists.map((val: listItem, i) => {
                                    return (
                                        <MenuItem
                                            onClick={(e) => {
                                                if (val.onClick) {
                                                    val.onClick(e, popupState);
                                                }
                                            }}
                                            key={i}
                                            sx={{
                                                margin: '0.125rem 0.25rem',
                                                padding: '0.25rem',
                                                color: val.color
                                            }}
                                            className='menu-item'
                                        >
                                            {val.content}
                                        </MenuItem>)
                                })}
                                {/* version */}
                                {showVersion ? <div className="version-footer">Techat Web 1.0.0</div> : ''}
                            </Menu>
                        </React.Fragment>
                    )
                }}
            </PopupState>
        )
    }
}
type MenuItemtype = {
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    },
    label: string,
    suffix?: any,
    onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, popupState: any) => void,
    color?: string
}
export type { MenuItemtype }
class ListItem extends Component<MenuItemtype, {}> {
    render(): React.ReactNode {
        const Icon = this.props.icon;
        return (
            <React.Fragment>
                <Icon className='menu-icon' style={{ color: this.props.color }} />
                <span className='menu-label'>{this.props.label}</span>
                <span className='menu-suffix'>{this.props.suffix}</span>
            </React.Fragment>
        )
    }
}

export { ListItem }
