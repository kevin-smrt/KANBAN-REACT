function Tag(props) {
    // Dissocie un tag d'une carte
    function dissocateTag() {
        const cardId = +props.cardId;
        const tagId = +props.id;

        props.dissociateTagToCard(cardId, tagId);
    }

    return (
        <span className="tag ml-2" style={{ backgroundColor: props.color }}>
            {props.name}
            <a onClick={dissocateTag} href="#" className="has-text-danger">
                <i className="fas fa-times ml-2"></i>
            </a>
        </span>
    )
}

export default Tag;