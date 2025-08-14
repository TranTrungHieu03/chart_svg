const MenuBarSvg = ({classContent}: {classContent?: string}) => {
    return <svg width="24" height="18" viewBox="0 0 24 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={classContent}>
        <rect width="24" height="1.5"></rect>
        <rect y="8.25" width="24" height="1.5"></rect>
        <rect y="16.5" width="24" height="1.5"></rect>
    </svg>
}

export default MenuBarSvg;