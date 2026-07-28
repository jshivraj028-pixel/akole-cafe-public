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
import kesariAmrakhandIceCreamImg from '../assets/kesari-amrakhand-ice-cream.png';
import rainbowUnicornIceCreamImg from '../assets/rainbow-unicorn-ice-cream.png';
import goldenButterscotchCrunchImg from '../assets/golden-butterscotch-crunch.png';
import classicVanillaBeanImg from '../assets/classic-vanilla-bean.png';
import akolePremiumWaterImg from '../assets/akole-premium-water.png';
import shahiRoyalFaloodaImg from '../assets/shahi-royal-falooda.png';
import kulhadMasalaChaiImg from '../assets/kulhad-masala-chai.png';
import specialIraniDumTeaImg from '../assets/special-irani-dum-tea.png';
import spicedVillageMatthaImg from '../assets/spiced-village-mattha.png';
import hotCappuccinoCoffeeImg from '../assets/hot-cappuccino-coffee.png';
import coldCoffeeVanillaImg from '../assets/cold-coffee-vanilla.png';
import thickChocolateFudgeShakeImg from '../assets/thick-chocolate-fudge-shake.png';
import shahiGulabJamunImg from '../assets/shahi-gulab-jamun.png';
import specialChickenDumBiryaniImg from '../assets/special-chicken-dum-biryani.png';
import spicyRedSauceArrabbiataPastaImg from '../assets/spicy-red-sauce-arrabbiata-pasta.png';
import vegHakkaNoodlesImg from '../assets/veg-hakka-noodles.png';
import schezwanFriedRiceImg from '../assets/schezwan-fried-rice.png';
import vegManchurianDryImg from '../assets/veg-manchurian-dry.png';
import dalTadkaJeeraRiceImg from '../assets/dal-tadka-jeera-rice.png';
import crispyAluVadiPatraImg from '../assets/crispy-alu-vadi-patra.png';

import rajurKandiPedhaImg from '../assets/rajur-kandi-pedha.png';
import bhandardaraWildHoneyImg from '../assets/bhandardara-wild-honey.png';
import kolhapuriMisalPavImg from '../assets/kolhapuri-misal-pav.png';
import classicMumbaiVadaPavImg from '../assets/classic-mumbai-vada-pav.png';
import butterLoadedPavBhajiImg from '../assets/butter-loaded-pav-bhaji.png';
import nashikKalaRassaMisalImg from '../assets/nashik-kala-rassa-misal.png';
import surmaiFishRavaFryImg from '../assets/surmai-fish-rava-fry.png';

import puneriMisalPavImg from '../assets/puneri-misal-pav.png';
import tandooriSmokedMisalImg from '../assets/tandoori-smoked-misal.png';
import cheeseButterMisalImg from '../assets/cheese-butter-misal.png';
import dahiMisalPavImg from '../assets/dahi-misal-pav.png';
import butterTossedVadaPavImg from '../assets/butter-tossed-vada-pav.png';
import cheeseLavaVadaPavImg from '../assets/cheese-lava-vada-pav.png';
import schezwanCrispyVadaPavImg from '../assets/schezwan-crispy-vada-pav.png';
import crispyPunjabiSamosaPavImg from '../assets/crispy-punjabi-samosa-pav.png';
import kesarDryFruitPedhaImg from '../assets/kesar-dry-fruit-pedha.png';
import cocaColaImg from '../assets/coca-cola-glass-bottle.png';
import thumsUpImg from '../assets/thums-up-chilled.png';
import spriteImg from '../assets/sprite-can-chilled.png';
import fantaImg from '../assets/fanta-orange-can.png';
import redBullImg from '../assets/red-bull-energy-drink.png';
import freshLimeSodaImg from '../assets/fresh-lime-soda.png';
import jeeraSodaImg from '../assets/jeera-masala-soda.png';
import chilledMangoJuiceImg from '../assets/chilled-mango-juice.png';
import blueLagoonMocktailImg from '../assets/blue-lagoon-mocktail.png';
import dietCokeCanImg from '../assets/diet-coke-can.png';
import cokeZeroCanImg from '../assets/coke-zero-can.png';
import pepsiCanImg from '../assets/pepsi-can-chilled.png';
import pepsiBlackCanImg from '../assets/pepsi-black-can.png';
import sevenUpBottleImg from '../assets/sevenup-bottle.png';
import mirindaOrangeCanImg from '../assets/mirinda-orange-can.png';
import limcaBottleImg from '../assets/limca-bottle-chilled.png';
import mountainDewBottleImg from '../assets/mountain-dew-bottle.png';
import schweppesSodaBottleImg from '../assets/schweppes-soda-bottle.png';
import kandaBhajiImg from '../assets/kanda-bhaji.png';
import batataBhajiImg from '../assets/batata-bhaji.png';
import mirchiBhajiImg from '../assets/mirchi-bhaji.png';
import mixVegBhajiImg from '../assets/mix-veg-bhaji.png';

export const getProductImage = (item) => {
  if (!item) return '';
  const name = (item.name || '').toLowerCase();

  // 1. Keyword matching for high-res cafe assets (ALWAYS PREVAILS FOR KNOWN ITEMS)
  // Bhaji / Pakoda Varieties
  if (name.includes('kanda bhaji') || name.includes('khekda bhaji')) return kandaBhajiImg;
  if (name.includes('palak bhaji') || name.includes('spinach bhaji') || name.includes('palak')) return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80';
  if (name.includes('raw banana') || name.includes('kachha kela') || name.includes('kela bhaji')) return 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80';
  if (name.includes('batata bhaji')) return batataBhajiImg;
  if (name.includes('mirchi bhaji') || name.includes('chili bhaji')) return mirchiBhajiImg;
  if (name.includes('mix veg bhaji') || name.includes('methi bhaji') || name.includes('cabbage bhaji') || name.includes('cauliflower bhaji') || name.includes('brinjal bhaji') || name.includes('bhaji')) return mixVegBhajiImg;

  // Samosa (All varieties)
  if (name.includes('samosa')) return crispyPunjabiSamosaPavImg;

  // Surmai Fish Fry
  if (name.includes('surmai') || name.includes('fish rava')) return surmaiFishRavaFryImg;

  // Vada Pav Varieties
  if (name.includes('schezwan') && name.includes('vada')) return schezwanCrispyVadaPavImg;
  if (name.includes('cheese lava') || name.includes('lava vada')) return cheeseLavaVadaPavImg;
  if (name.includes('butter tossed') || name.includes('butter vada')) return butterTossedVadaPavImg;
  if (name.includes('vada')) return classicMumbaiVadaPavImg;

  // Misal Specific Mappings
  if (name.includes('nashik') || name.includes('kala rassa') || name.includes('kala misal')) return nashikKalaRassaMisalImg;
  if (name.includes('tandoori') || name.includes('smoked misal')) return tandooriSmokedMisalImg;
  if (name.includes('cheese butter misal') || name.includes('cheese misal')) return cheeseButterMisalImg;
  if (name.includes('dahi misal')) return dahiMisalPavImg;
  if (name.includes('puneri misal')) return puneriMisalPavImg;
  if (name.includes('kolhapuri misal') || name.includes('misal')) return kolhapuriMisalPavImg;

  // Pedha Specific Mappings
  if (name.includes('kesar dry fruit pedha') || name.includes('kesar pedha')) return kesarDryFruitPedhaImg;
  if (name.includes('shuddha') || name.includes('shuddha milk pedha')) return shuddhaMilkPedhaImg;
  if (name.includes('pedha') || name.includes('rajur') || name.includes('kandi')) return rajurKandiPedhaImg;

  // Honey & Butter
  if (name.includes('honey') || name.includes('wild forest')) return bhandardaraWildHoneyImg;
  if (name.includes('white butter') || name.includes('loni')) return villageWhiteButterImg;

  // Pav Bhaji & Patra
  if (name.includes('pav bhaji')) return butterLoadedPavBhajiImg;
  if (name.includes('alu vadi') || name.includes('patra') || name.includes('hurda')) return crispyAluVadiPatraImg;
  if (name.includes('bhutta') || name.includes('corn')) return villageWhiteButterImg;

  // Rice / Biryani / Chinese
  if (name.includes('manchurian')) return vegManchurianDryImg;
  if (name.includes('hakka') || name.includes('noodles')) return vegHakkaNoodlesImg;
  if (name.includes('dal tadka') || name.includes('jeera rice')) return dalTadkaJeeraRiceImg;
  if (name.includes('rice') || name.includes('bhaat') || name.includes('fried rice') || (name.includes('schezwan') && !name.includes('vada'))) return schezwanFriedRiceImg;
  if (name.includes('biryani')) return specialChickenDumBiryaniImg;

  // Fast food & Desserts
  if (name.includes('pasta') || name.includes('arrabbiata')) return spicyRedSauceArrabbiataPastaImg;
  if (name.includes('gulab jamun')) return shahiGulabJamunImg;
  if (name.includes('chocolate fudge') || name.includes('fudge shake')) return thickChocolateFudgeShakeImg;
  if (name.includes('mattha') || name.includes('buttermilk')) return spicedVillageMatthaImg;
  if (name.includes('cappuccino')) return hotCappuccinoCoffeeImg;
  if (name.includes('cold coffee') || name.includes('vanilla ice cream')) return coldCoffeeVanillaImg;
  // Cold Drinks, Sodas, Mocktails & Beverages (Distinct High-Res Images)
  if (name.includes('green apple mojito') || name.includes('green apple')) return 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80';
  if (name.includes('watermelon mojito') || name.includes('watermelon')) return 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80';
  if (name.includes('virgin mojito') || (name.includes('mojito') && !name.includes('blue'))) return 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80';
  if (name.includes('blue lagoon') || name.includes('curacao')) return blueLagoonMocktailImg;

  if (name.includes('mango lassi')) return 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80';
  if (name.includes('sweet lassi') || (name.includes('lassi') && !name.includes('mango'))) return 'https://images.unsplash.com/photo-1571006682858-a458b8d234a5?auto=format&fit=crop&w=800&q=80';
  if (name.includes('sol kadhi')) return 'https://images.unsplash.com/photo-1623065422902-30a2d299bcc4?auto=format&fit=crop&w=800&q=80';
  if (name.includes('kokum')) return 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80';
  if (name.includes('badam milk') || name.includes('kesar badam')) return 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80';

  if (name.includes('appy fizz') || name.includes('appy')) return 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80';
  if (name.includes('diet coke')) return dietCokeCanImg;
  if (name.includes('coke zero') || name.includes('zero sugar')) return cokeZeroCanImg;
  if (name.includes('pepsi black')) return pepsiBlackCanImg;
  if (name.includes('pepsi')) return pepsiCanImg;
  if (name.includes('coca') || name.includes('cola')) return cocaColaImg;
  if (name.includes('thums up') || name.includes('thums')) return thumsUpImg;
  if (name.includes('sprite')) return spriteImg;
  if (name.includes('7up') || name.includes('seven up')) return sevenUpBottleImg;
  if (name.includes('mountain dew') || name.includes('dew')) return mountainDewBottleImg;
  if (name.includes('fanta')) return fantaImg;
  if (name.includes('mirinda')) return mirindaOrangeCanImg;
  if (name.includes('limca')) return limcaBottleImg;
  if (name.includes('schweppes')) return schweppesSodaBottleImg;

  if (name.includes('monster')) return 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=800&q=80';
  if (name.includes('sting')) return 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80';
  if (name.includes('gatorade')) return 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80';
  if (name.includes('electral') || name.includes('ors')) return 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80';
  if (name.includes('red bull') || name.includes('energy')) return redBullImg;

  if (name.includes('himalayan')) return 'https://images.unsplash.com/photo-1560023907-5f310c82388c?auto=format&fit=crop&w=800&q=80';
  if (name.includes('bisleri') || name.includes('kinley') || name.includes('aquafina') || name.includes('bailey')) return 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80';
  if (name.includes('water') || name.includes('mineral')) return akolePremiumWaterImg;

  if (name.includes('lemon infused') || name.includes('detox water')) return 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80';
  if (name.includes('cucumber infused') || name.includes('mint infused')) return 'https://images.unsplash.com/photo-1603569283847-be29b8b3bf1d?auto=format&fit=crop&w=800&q=80';
  if (name.includes('orange infused')) return 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80';

  if (name.includes('real orange') || name.includes('real apple') || name.includes('real mixed') || name.includes('juice')) return 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80';
  if (name.includes('maaza') || name.includes('slice') || name.includes('frooti') || name.includes('aamras') || name.includes('aam panna')) return chilledMangoJuiceImg;
  if (name.includes('jeera') || name.includes('schweppes') || (name.includes('soda') && !name.includes('lime'))) return jeeraSodaImg;
  if (name.includes('lime') || name.includes('lemon') || name.includes('electral')) return freshLimeSodaImg;
  if (name.includes('chaas') || name.includes('mattha')) return spicedVillageMatthaImg;
  if (name.includes('falooda') || name.includes('royal falooda')) return shahiRoyalFaloodaImg;
  if (name.includes('irani') || name.includes('dum tea')) return specialIraniDumTeaImg;
  if (name.includes('kulhad') || name.includes('masala chai') || name.includes('chai') || name.includes('tea')) return kulhadMasalaChaiImg;
  if (name.includes('modak')) return ukadicheModakImg;
  if (name.includes('cotton candy')) return cottonCandyScoopImg;
  if (name.includes('caramel macchiato') || name.includes('macchiato')) return icedCaramelMacchiatoImg;
  if (name.includes('sitaphal') || name.includes('custard apple')) return freshSitaphalImg;
  if (name.includes('tender coconut') || name.includes('shahale')) return tenderCoconutScoopImg;
  if (name.includes('dutch chocolate') || name.includes('belgian') || name.includes('dark chocolate')) return belgianDarkChocolateImg;
  if (name.includes('ferrero') || name.includes('rocher')) return ferreroRocherCrunchImg;
  if (name.includes('sizzling') || name.includes('brownie')) return sizzlingBrownieFudgeImg;
  if (name.includes('roasted almond') || name.includes('almond fudge')) return roastedAlmondFudgeImg;
  if (name.includes('cookies') || name.includes('oreo')) return cookiesCreamOreoScoopImg;
  if (name.includes('shahi dry fruit') || name.includes('dry fruit sundae')) return kesariAmrakhandIceCreamImg;
  if (name.includes('sundae') || name.includes('overload')) return ultimateChocolateSundaeImg;
  if (name.includes('amrakhand') || name.includes('kesari amrakhand')) return kesariAmrakhandIceCreamImg;
  if (name.includes('strawberry') || name.includes('rainbow') || name.includes('unicorn')) return rainbowUnicornIceCreamImg;
  if (name.includes('butterscotch') || name.includes('golden butterscotch')) return goldenButterscotchCrunchImg;
  if (name.includes('paneer chilli') || name.includes('chilli fry')) return 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80';
  if (name.includes('pizza')) return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80';
  if (name.includes('burger')) return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80';
  if (name.includes('sandwich')) return 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80';
  if (name.includes('coffee')) return hotCappuccinoCoffeeImg;

  // 2. Check if user provided a custom image URL (ignoring default coffee placeholders)
  const customImg = item.image || item.imageUrl;
  if (
    customImg && 
    typeof customImg === 'string' && 
    customImg.trim() !== '' && 
    !customImg.includes('hero-coffee.png') && 
    !customImg.includes('photo-1541167760496-1628856ab772') && 
    (customImg.startsWith('http') || customImg.startsWith('data:') || customImg.startsWith('/uploads') || customImg.startsWith('blob:'))
  ) {
    return customImg;
  }

  // 3. Fallback default to Samosa/Snack asset instead of coffee
  return crispyPunjabiSamosaPavImg;
};
