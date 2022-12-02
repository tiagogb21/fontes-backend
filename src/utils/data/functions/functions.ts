import axios from "axios";

export const formatedDate = (date: string) => {
  let formDate = date.split(' ')[0].replace('T', '').split('-');
  const newDate = new Date(+formDate[2], +formDate[1], +formDate[0])
  return newDate.toISOString();
}

export const getZipCodeInfo = async (zipCode: number) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${ zipCode }/json/`)
    const { logradouro, uf } = response.data;
    return `${logradouro}/${uf}`;
  } catch (error: any) {
    console.log(error.response.body);
  }
};
