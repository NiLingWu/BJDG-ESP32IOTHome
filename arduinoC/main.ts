enum LINE {
    //% block="D13/IO12"
    12,
    //% block="D12/IO4"
    4,
    //% block="D11/IO16"
    16,
    //% block="D10/IO17"
    17,
    //% block="D9/IO2"
    2,
    //% block="D8/IO5"
    5,
    //% block="D7/IO13"
    13,
    //% block="D6/IO14"
    14,
    //% block="D4/IO27"
    27,
    //% block="D3/IO25"
    25,
    //% block="D2/IO26"
    26
}


//% color="#AA278D" iconWidth=50 iconHeight=40
namespace bjdg {
    //% block="RGBW lights initialization, pin [PIN] total number of lamps [NUM]" blockType="command"
    //% PIN.shadow="dropdown" PIN.options="LINE" 
    //% NUM.shadow="number" NUM.defl=4
    export function initRGBW(parameter: any, block: any) {
        let pin = parameter.PIN.code;
        let num = parameter.NUM.code;
        Generator.addInclude("RGBW1", "#include <Adafruit_NeoPixel.h>");
        Generator.addObject("RGBW2", "Adafruit_NeoPixel",`RGBW(${num},${pin},NEO_GRBW +NEO_KHZ800);`);
        Generator.addSetup("RGBW3", `RGBW.begin();`);
        Generator.addSetup("RGBW4", `RGBW.show();`);
    }

    //% block="RGBW lights setting brightness [LIGHT]" blockType="command"
    //% LIGHT.shadow="range" LIGHT.defl=255 LIGHT.params.min=0 LIGHT.paramas.max=255
    export function setlight(parameter: any, block: any) {
        let light = parameter.LIGHT.code;
        Generator.addInclude("RGBW1", "#include <Adafruit_NeoPixel.h>");
        Generator.addSetup("RGBW.setBrightness",`RGBW.setBrightness(${light});`);
    }

    //% block=" All RGBW lights are off" blockType="command"
    export function clearcolor(parameter: any, block: any) {
        Generator.addInclude("RGBW1", "#include <Adafruit_NeoPixel.h>");
        Generator.addCode(`for(int i =0 ;i<RGBW.numPixels();i++){
            RGBW.setPixelColor(i, RGBW.Color(0, 0, 0));
            RGBW.show();}`);
    }

    //% externalFunc
    export function getColorsFunc_() {
        return [
            "#ff0000", "#ffff00", "#ffffff", "#00ff00", "#00ffff", "#0000ff", "#ff00ff", "#A52A2A",
            "#FFD700", "#808080", "#FFA500", "#FF7F50", "#FFC0CB", "#8d4bbb"
        ]
    }
    //% block="RGBW lights display color [COLOR] from [NUM1] lights to [NUM2] lights" blockType="command"
    //% NUM1.shadow="number" NUM1.defl=0
    //% NUM2.shadow="number" NUM2.defl=4
    //% COLOR.shadow="colorPalette" COLOR.params.column=6
    //% COLOR.params.colorsFunc="getColorsFunc_"
    export function shownum1tonum2color(parameter: any, block: any) {
        let num1 = parameter.NUM1.code;
        let num2 = parameter.NUM2.code ;
        let color=parameter.COLOR.code; //获取传进来的值

        var r = 0;
        var g = 0;
        var b = 0;
        var w = 0;
        var str = "";
        try {
            if ( color.length != 8 ) {//分别截取RGB值然后转换为数字值
                var col = color.split(",");
                r = col[0];
                g = col[1];
                b = col[2];
                w = col[3];
            }
            else{
                r = parseInt(color.substring(2, 4), 16);
                g =parseInt(color.substring(4, 6), 16) ;
                b =parseInt(color.substring(6, 8), 16);
                w =0;
            }
        } catch(e) {
            return '';
        }
        Generator.addInclude("RGBW1", "#include <Adafruit_NeoPixel.h>");
        Generator.addCode(`for(int i =${num1} ;i<${num2};i++){
            RGBW.setPixelColor(i, RGBW.Color(${r},${g},${b},${w}));
            RGBW.show();}`);//使用RGB颜色生成代码

        // let str = parameter.STR.code
        // let x = parameter.X.code
        // let y = parameter.Y.code
        // Generator.addInclude('oled12864', '#include <oled12864.h>');
        // Generator.addObject(`myoled`, `OLED_12864`, `myoled;`);
        // Generator.addSetup(`myoled.begin`, `myoled.begin();`);
        // Generator.addCode(`myoled.setCursor(${x}, ${y});`,`myoled.print(${str});`);
    }

     //% block=" RGBW light [NUM] light display color [COLOR] " blockType="command"
    //% NUM.shadow="number" NUM.defl=0
    //% COLOR.shadow="colorPalette" COLOR.params.column=6
    //% COLOR.params.colorsFunc="getColorsFunc_"
    export function showcolor(parameter: any, block: any) {
        let num = parameter.NUM.code;
        let color=parameter.COLOR.code; //获取传进来的值
        var r = 0;
        var g = 0;
        var b = 0;
        var w = 0;
        var str = "";
        try {
            if ( color.length != 8 ) {//分别截取RGB值然后转换为数字值
                var col = color.split(",");
                r = col[0];
                g = col[1];
                b = col[2];
                w = col[3];
            }
            else{
                r = parseInt(color.substring(2, 4), 16);
                g =parseInt(color.substring(4, 6), 16) ;
                b =parseInt(color.substring(6, 8), 16);
                w= 0;
            }
        } catch(e) {
            return '';
        }
        Generator.addInclude("RGBW1", "#include <Adafruit_NeoPixel.h>");
        Generator.addCode(`RGBW.setPixelColor(${num}, RGBW.Color(${r},${g},${b},${w}));
            RGBW.show();`);//使用RGB颜色生成代码

        // let str = parameter.STR.code
        // let x = parameter.X.code
        // let y = parameter.Y.code
        // Generator.addInclude('oled12864', '#include <oled12864.h>');
        // Generator.addObject(`myoled`, `OLED_12864`, `myoled;`);
        // Generator.addSetup(`myoled.begin`, `myoled.begin();`);
        // Generator.addCode(`myoled.setCursor(${x}, ${y});`,`myoled.print(${str});`);
    }

    //% block="RGBW light color values [red], [green], [blue], [white] " blockType="reporter"
    //% red.shadow="range" red.params.min=1 red.params.max=255 red.defl=0
    //% green.shadow="range" green.params.min=1 green.params.max=255 green.defl=0
    //% blue.shadow="range" blue.params.min=1 blue.params.max=255 blue.defl=0
    //% white.shadow="range" white.params.min=1 white.params.max=255 white.defl=0
    export function setcolor(parameter: any, block: any) {
        let red = parameter.red.code
        let green = parameter.green.code
        let blue = parameter.blue.code
        let white = parameter.white.code
        Generator.addCode(`${red},${green},${blue},${white}`);
    }

    //% block="RFID-RC522 module initialization, SDA pin [SS] RST pin [RST]" blockType="command"
    //% SS.shadow="dropdown" SS.options="LINE"
    //% RST.shadow="dropdown" RST.options="LINE"
    export function MFRC522Init(parameter: any, block: any) {
        let ss = parameter.SS.code;
        let rst = parameter.RST.code;
        Generator.addInclude("MFRC522_1","#include <SPI.h>");
        Generator.addInclude("MFRC522_2","#include <MFRC522.h>");
        Generator.addObject("MFRC522_3","MFRC522",`rfid(${ss},${rst});`);
        Generator.addSetup("MFRC522_4",`Serial.begin(9600); `);
        Generator.addSetup("MFRC522_5",`SPI.begin(); `);
        Generator.addSetup("MFRC522_6",`rfid.PCD_Init(); `);
    }

    //% block="RFID-RC522 module detects new card numbers " blockType="command"
    export function MFRC522get(parameter: any, block: any) {
        Generator.addObject("MFRC522_7","byte",`nuidPICC[4];`);
        Generator.addCode(`if(!rfid.PICC_IsNewCardPresent())
        return;`);
        Generator.addCode(`if(!rfid.PICC_ReadCardSerial())
        return;`);
        Generator.addCode(`Serial.print(F("PICC type: "));`);
        Generator.addCode(`MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);`);
        Generator.addCode(`Serial.println(rfid.PICC_GetTypeName(piccType));`);
        Generator.addCode(`if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&  
            piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
            piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
                Serial.println("Your tag is not of type MIFARE Classic.");
                return;
          }`);
        Generator.addCode(`if (rfid.uid.uidByte[0] != nuidPICC[0] || 
            rfid.uid.uidByte[1] != nuidPICC[1] || 
            rfid.uid.uidByte[2] != nuidPICC[2] || 
            rfid.uid.uidByte[3] != nuidPICC[3] ) {
            Serial.println(F("A new card has been detected."));
            for (byte i = 0; i < 4; i++) {
              nuidPICC[i] = rfid.uid.uidByte[i];
            }
           
            Serial.println(F("The NUID tag is:"));
            for (byte i = 0; i < 4; i++) {
                Serial.print(nuidPICC[i] < 0x10 ? "0" : "");
                Serial.print(nuidPICC[i], HEX);
                Serial.print(" ");
              }
            Serial.println();
        }
        else Serial.println(F("Card read previously."));`);
        Generator.addCode(`rfid.PICC_HaltA();`);
        Generator.addCode(`rfid.PCD_StopCrypto1();`);
    }
    //% block="RFID RC522 module card number password matching array [num1], [num2], [num3], [num4], result output " blockType="command"
    //% num1.shadow="number" num1.defl=0x27
    //% num2.shadow="number" num2.defl=0x27
    //% num3.shadow="number" num3.defl=0x27
    //% num4.shadow="number" num4.defl=0x27
    export function MFRC522check(parameter: any, block: any) {
        let num1 = parameter.num1.code;
        let num2 = parameter.num2.code;
        let num3 = parameter.num3.code;
        let num4 = parameter.num4.code;
        Generator.addObject("MFRC522_7","byte",`key[4] ={${num1},${num2},${num3},${num4}};`);
        Generator.addObject("MFRC522_8","int",`mark=0;`);
        Generator.addCode(`if(!rfid.PICC_IsNewCardPresent())
        return;`);
        Generator.addCode(`if(!rfid.PICC_ReadCardSerial())
        return;`);
        
        Generator.addCode(`MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);`);
        Generator.addCode(`if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&  
            piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
            piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
                Serial.println("Your tag is not of type MIFARE Classic.");
                mark = 2;
          }`);
        Generator.addCode(`if (rfid.uid.uidByte[0] == key[0] && 
            rfid.uid.uidByte[1] == key[1] && 
            rfid.uid.uidByte[2] == key[2] && 
            rfid.uid.uidByte[3] == key[3] ) {
                mark = 1;
        }
        else mark = 2;`);
        Generator.addCode(`rfid.PICC_HaltA();`);
        Generator.addCode(`rfid.PCD_StopCrypto1();`);
    }

    //% block="RFID RC522 module pairing result " blockType="reporter"
    export function MFRC522result(parameter: any, block: any) {
        Generator.addCode(`mark`);
    }
    //% block="RFID RC522 module pairing result assigned as [back]" blockType="command"
    //% back.shadow="number" back.defl=0
    export function MFRC522resultback(parameter: any, block: any) {
        let back = parameter.back.code;
        Generator.addCode(`mark = ${back};`);
    }


    //% block="LCD module initialization, I2C address [adr] module column count [lie] module row count [hang]" blockType="command"
    //% adr.shadow="number" adr.defl=0x27
    //% lie.shadow="number" lie.defl=16
    //% hang.shadow="number" hang.defl=2
    export function LCDInit(parameter: any, block: any) {
        let adr = parameter.adr.code;
        let lie = parameter.lie.code;
        let hang = parameter.hang.code;
        Generator.addInclude("LCDInit1","#include <Wire.h>");
        Generator.addInclude("LCDInit2","#include <LiquidCrystal_I2C.h>");
        Generator.addObject("LCDInit3","LiquidCrystal_I2C",`lcd(${adr}, ${lie}, ${hang});`);
        Generator.addSetup("LCDInit5",`lcd.init(); `);
        Generator.addSetup("LCDInit6",`lcd.backlight();`);
    }

    //% block="LCD module displays characters [str] in X: [num1] Y: [num2]" blockType="command"
    //% str.shadow="string" str.defl="hello world"
    //% num1.shadow="number" num1.defl=0
    //% num2.shadow="number" num2.defl=0
    export function showstr(parameter: any, block: any) {
        let str = parameter.str.code;
        let num1 = parameter.num1.code;
        let num2 = parameter.num2.code;

        Generator.addCode(`lcd.setCursor(${num2}, ${num1}); `);
        Generator.addCode(`lcd.print(${str});`);
    }

    //% block=" "LCD module display clear screen " blockType="command"
     export function clearlcd(parameter: any, block: any) {
        Generator.addCode(`lcd.clear();`);
    }

    //% block="Bluetooth initialization, Bluetooth name [name]" blockType="command"
    //% name.shadow="string" name.defl=bluetoothname
    export function BlueToothInit(parameter: any, block: any) {
        let name = parameter.name.code;
        Generator.addInclude("bluetooth1",`#include "BluetoothSerial.h" `);
        Generator.addObject("bluetooth3","BluetoothSerial",`SerialBT;`);
        Generator.addObject("bluetooth2","String",`BT;`);
        Generator.addSetup("bluetooth5",`SerialBT.begin(${name});`);
        Generator.addSetup("bluetooth6",`Serial.println("The device started, now you can pair it with bluetooth!");`);
    }

    //% block="Bluetooth data acquisition method " blockType="command"
    export function BlueToothgetmsg1(parameter: any, block: any) {
        Generator.addCode(`
            while (SerialBT.available()) {
                delay(50);
                      char a = SerialBT.read();
                      BT+=a;
             }`);
    }
    //% block="Bluetooth data" blockType="reporter"
    export function BlueToothgetmsg(parameter: any, block: any) {
        Generator.addCode(`BT`);
    }

    //% block="Clear Bluetooth data " blockType="command"
    export function clearmsg(parameter: any, block: any) {
        Generator.addCode(`BT = "";`);
    }

    //% block="Sending Bluetooth data [msg] " blockType="command"
    //% msg.shadow="string" msg.defl="hello world"
    export function sendmsg(parameter: any, block: any) {
        let msg = parameter.msg.code;
        Generator.addCode(`SerialBT.print(${msg});`);
    }

}
