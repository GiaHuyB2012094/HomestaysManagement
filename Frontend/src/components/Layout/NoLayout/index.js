function NoLayout({ children }) {
    return (
        <>
            <div className="container" >
                <div className="content">{children}</div>
            </div>
        </>
    );
}

export default NoLayout;
