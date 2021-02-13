module.exports = function(sequelize, DataTypes){
    return sequelize.define('destination', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descr: {
        type: DataTypes.STRING,
        allowNull: false
      },
      xid: {
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