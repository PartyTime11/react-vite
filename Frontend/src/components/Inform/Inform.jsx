import "./Inform.css"

const Inform = () => {
    return (
        <div>
            <div className="inform">
                <img src='/Harry.png' className="inform-img"/>
                <div className="inform-text">
                    <p className="text first-text bottom">
                        Harry Potter Shop – The Wizarding World at Your Fingertips!
                        Welcome to the official Harry Potter Shop – where the magic and legendary atmosphere of J.K. Rowling's universe comes to life! <br/>
                        Why choose our shop?
                    </p>
                    <ul className="text first-text">
                        <li>
                            Official merchandise – only licensed products from Warner Bros
                        </li>
                        <li>
                            Wide selection – from robes and wands to rare collectible editions
                        </li>
                        <li>
                            Worldwide delivery – magic knows no borders!
                        </li>
                        <li>
                            Fan exclusives – unique items inspired by Hogwarts and the wizarding world
                        </li>
                    </ul>
                </div>
            </div>
            <div className="img-container" >
                <img src='/Owl.png' className="inform-img2"/>
            </div>
            
        </div>
    )
}

export default Inform