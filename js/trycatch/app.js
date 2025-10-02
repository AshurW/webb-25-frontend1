// let jsonString = '{"name": "Anna", age: 25}';

// try {
//   let data = JSON.parse(jsonString);
//   console.log(data.name); // Anna
// } catch (error) {
//   console.log("JSON är ogiltigt:", error.message);
// }

// let fruits = ["äpple", "banan", "apelsin"];

// try {
//   console.log(fruits[10]); // undefined, men inget fel
//   console.log(fruits[10].toUpperCase()); // FEL!
// } catch (error) {
//   console.log("Kan inte hämta frukt:", error.message);
// }

// function divide(a, b) {
//   if (b === 0) {
//     throw new Error("Division med noll är inte tillåten!");
//   }
//   return a / b;
// }

// try {
//   let result = divide(10, 0);
//   console.log(result);
// } catch (error) {
//   console.log("Fel:", error.message);
// }

// console.log("resterand program");

// try {
//     console.log(undefinedVariable);
//   } catch (error) {
//     console.log("ReferenceError:", error.message);
//   }

// try {
//   eval("console.log('hej'"); // Saknar stängande parentes
// } catch (error) {
//   console.log("SyntaxError:", error.message);
// }


function validateAge(age) {
    try {
      if (isNaN(age)) {
        throw new Error("Ålder måste vara ett nummer");
      }
      if (age < 0) {
        throw new Error("Ålder kan inte vara negativ");
      }
      if (age > 150) {
        throw new Error("Ålder verkar orimlig");
      }
      return `Du är ${age} år gammal`;
    } catch (error) {
      return `Fel: ${error.message}`;
    }
  }
  
  console.log(validateAge(25)); // "Du är 25 år gammal"
  console.log(validateAge("abc")); // "Fel: Ålder måste vara ett nummer"
  