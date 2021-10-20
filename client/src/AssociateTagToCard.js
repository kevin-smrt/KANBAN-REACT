function AssociateTagToCard(props) {
    // Ferme la modal pour associer un tag à une carte
    function closeTagModal() {
        const associateTagModal = document.getElementById("associateTagModal");

        associateTagModal.classList.remove("is-active");
    }

    // Envoie des données à l'API pour associer un tag à une carte
    function handleSaveTag(event) {
        event.preventDefault();
        // Récupère l'index de l'element select
        const index = document.getElementById("associateTagModal").querySelector('select').selectedIndex;
        // Récupère l'element qui correspond à l'index du select
        const optionElement = document.getElementById("associateTagModal").querySelector('select').childNodes[index];
        // Récupère l'attribut id de l'element en question pour prendre son id
        const tagId = +optionElement.getAttribute('id');
        const cardId = +document.getElementById("associateTagModal").dataset.cardId;

        props.associateTagToCard(cardId, tagId);
    }

    return (
        <div className="modal" id="associateTagModal" data-card-id="">
            <div className="modal-background"></div>
            <div className="modal-card">
                <form action="" method="POST">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Associer un tag</p>
                        <button onClick={closeTagModal} className="delete close" type="button" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="field select">
                            <select className="tag-name">
                                {props.tags.map((tag, index) => {
                                    return <option key={index} id={tag.id}>{tag.name}</option>
                                })}
                            </select>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={handleSaveTag} className="button is-success">Sauvegarder</button>
                        <button onClick={closeTagModal} className="button close" type="button">Annuler</button>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default AssociateTagToCard;