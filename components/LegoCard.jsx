

export default function LegoCard({navigation}){
    legoName = props.PartName
    imageUrl = props.ImageURL
    legoColor = props.Colour
    legoCategory = props.Category
    legoID = props.PartID

    
    return(
        <ListItem
        leadingMode="avatar"
        leading={
          <Avatar image={{ uri: imageUrl }} />
        }
        title= {legoName}
        secondaryText={'Category: ' + legoCategory}
        onPress={() => navigation.navigate('Lego',{ partId: "3213222" })}
      />
    );

} 