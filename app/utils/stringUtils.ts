export function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeWords(str: string) {
    return str
      .replace(/-/g, " ")             
      .split(" ")                       
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(" ");                      
  }