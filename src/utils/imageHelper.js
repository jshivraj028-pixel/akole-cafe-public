import ukadicheModakImg from '../assets/ukadiche-modak.png';
import cottonCandyScoopImg from '../assets/cotton-candy-scoop.png';
import icedCaramelMacchiatoImg from '../assets/iced-caramel-macchiato.png';
import shuddhaMilkPedhaImg from '../assets/shuddha-milk-pedha.png';
import villageWhiteButterImg from '../assets/village-white-butter.png';
import freshSitaphalImg from '../assets/fresh-sitaphal.png';
import tenderCoconutScoopImg from '../assets/tender-coconut-scoop.png';
import belgianDarkChocolateImg from '../assets/belgian-dark-chocolate.png';
import ferreroRocherCrunchImg from '../assets/ferrero-rocher-crunch.png';
import sizzlingBrownieFudgeImg from '../assets/sizzling-brownie-fudge.png';
import roastedAlmondFudgeImg from '../assets/roasted-almond-fudge.png';
import cookiesCreamOreoScoopImg from '../assets/cookies-cream-oreo-scoop.png';
import ultimateChocolateSundaeImg from '../assets/ultimate-chocolate-sundae.png';

export const getProductImage = (item) => {
  if (!item) return '';
  const name = (item.name || '').toLowerCase();

  if (name.includes('modak')) return ukadicheModakImg;
  if (name.includes('cotton candy')) return cottonCandyScoopImg;
  if (name.includes('caramel macchiato') || name.includes('macchiato')) return icedCaramelMacchiatoImg;
  if (name.includes('pedha') || name.includes('milk pedha')) return shuddhaMilkPedhaImg;
  if (name.includes('white butter') || name.includes('loni')) return villageWhiteButterImg;
  if (name.includes('sitaphal') || name.includes('custard apple')) return freshSitaphalImg;
  if (name.includes('tender coconut') || name.includes('shahale')) return tenderCoconutScoopImg;
  if (name.includes('belgian') || name.includes('dark chocolate')) return belgianDarkChocolateImg;
  if (name.includes('ferrero') || name.includes('rocher')) return ferreroRocherCrunchImg;
  if (name.includes('sizzling') || name.includes('brownie')) return sizzlingBrownieFudgeImg;
  if (name.includes('roasted almond') || name.includes('almond fudge')) return roastedAlmondFudgeImg;
  if (name.includes('cookies') || name.includes('oreo')) return cookiesCreamOreoScoopImg;
  if (name.includes('sundae') || name.includes('overload')) return ultimateChocolateSundaeImg;

  return item.image || item.imageUrl || '/images/hero-coffee.png';
};
