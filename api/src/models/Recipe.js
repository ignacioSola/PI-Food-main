const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false, 
    },
    punctuation: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    healthScore: {
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    instructions: {
      type: DataTypes.TEXT,
      defaultValue:''
    },
    image: {
      type: DataTypes.STRING,
      // defaultValue: 'https://comodibujar.club/wp-content/uploads/2020/09/kawaii-Aguacate-300x300.jpg'
    },
    createdInDB:{
      type: DataTypes.BOOLEAN,
      defaultValue:true,
    }
  },
  {
      timestamps: false
  });
};
