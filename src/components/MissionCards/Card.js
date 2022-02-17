const Card = ({ name, description, dates, imageUrl, reference, status, onClickHandler, args }) => {
    const className = "mission-card"

    return (
        <div className={className}>
            <div className={`${className}-side`}>
                <img
                    src={imageUrl}
                    alt={name}
                    className={`${className}-image`}
                />

                {reference && <div
                    className={`${className}-reference`}
                >
                    <a target="_blank" rel="noopener noreferrer" href={reference}>Learn More</a>
                </div>}

                {<div className={`${className}-status`}>
                    <div className={`${className}-status-text`}>
                        Status: {status}
                    </div>
                    <i className={`${className}-status-icon ${status}`}></i>
                </div>}
            </div>
            
            <div className={`${className}-body`}>
                <h4
                    className = {`${className}-name`}
                    onClick={() => {
                        onClickHandler(...args)
                    }}
                >
                    {name}
                </h4>
                
                <div
                    className = {`${className}-description`}
                >
                    {description}
                </div>
                
                {/* {dates.length !== 0 && dates.map( (date, key) => (
                    <div
                        className = {`${className}-dates`}
                        key={key}
                    >
                        {date}
                    </div>
                ))} */}

            </div>
        </div>
    )
}

export default Card