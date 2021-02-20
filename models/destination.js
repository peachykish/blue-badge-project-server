module.exports = function(sequelize, DataTypes){
    return sequelize.define('destination', {
      descr: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      wikidata: {
        type: DataTypes.STRING,
        allowNull: false
      },
      owner_id:{
        type: DataTypes.INTEGER,
        allowNull:false
      },
      trip_id:{
        type: DataTypes.INTEGER,
        allowNull:false
      }
  
    })
  }