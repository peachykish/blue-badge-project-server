module.exports = function(sequelize, DataTypes){
  const Trip = sequelize.define('trip', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    place:{
      type:DataTypes.STRING,
      allowNull:false
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    lon: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    owner_id:{
      type: DataTypes.INTEGER,
      allowNull:false
    }

  })
  return Trip
}