const Rough = () => {
    return (
        <>
                <div style={style.container}>
            <h1 style={style.heading}>topic</h1>
            <div style={style.postContainer}>
                <div style={style.postBox}>
                    <h3>yo</h3>
                    <p>ko</p>
                </div>
                </div>
            </div>
            <div style={style.container}>
            <h1 style={style.heading}>topic</h1>
            <div style={style.postContainer}>
                <div style={style.postBox}>
                    <h3>yo</h3>
                    <p>ko</p>
                </div>
                </div>
            </div>
            </>
            );
};

            const style = {
                container: {
                padding: '20px',
            backgroundColor: 'var(--background-color)',
            color: 'var(--text-color)',
    },
            heading: {
                color: 'var(--text-color)',
    },
            postContainer: {
                display: 'flex',
            flexDirection: 'column',
            gap: '20px',
    },
            postBox: {
                border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: 'var(--background-color)',
            color: 'var(--text-color)',
    },
            error: {
                color: 'red',
    },
  };
            export default Rough;