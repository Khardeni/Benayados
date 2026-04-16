// src/images.js
const CLD = 'https://res.cloudinary.com/dih6ly6pz/image/upload'
const F = 'f_auto,q_auto'

export const IMAGES = {
    logo: `${CLD}/${F}/v1776345462/Benayados_Logo_jwhw4b`,
    logoLg: `${CLD}/f_auto,q_auto,w_160/v1776345462/Benayados_Logo_jwhw4b`,
    logo2x: `${CLD}/f_auto,q_auto,w_320/v1776345462/Benayados_Logo_jwhw4b`,
    heroBg: `${CLD}/${F},w_1400/v1776345297/fond_cpejvm`,
    histoireMain: `${CLD}/${F},w_700/v1776265342/H%C3%A9ritage_gvstws`,
    terrePanorama: `${CLD}/${F},w_1400/v1776345297/fond_cpejvm`,
    products: {
        huileOlive: `${CLD}/${F},w_400/v1776345299/zitzitoun_eivyda`,
        ble: `${CLD}/${F},w_400/v1776345308/gam7_pwfq63`,
        feve: `${CLD}/${F},w_400/v1776265342/feve1_xjvlvh`,
        feverole: `${CLD}/${F},w_400/v1776265341/fevrole_s7dsd8`,
        poisChiche: `${CLD}/${F},w_400/v1776265341/pois_chiche_tcj05n`,
        fenugrec: `${CLD}/${F},w_400/v1776345301/fenu_c73utz`,
    }
}