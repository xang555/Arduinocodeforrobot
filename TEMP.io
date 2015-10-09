#include "DHT.h"
#include <LiquidCrystal.h>
#define REDLED  13
#define YLED     12
#define GLED     11
#define SOUND     2

DHT dht;
LiquidCrystal lcd(8, 9, 4, 5, 6, 7);

void setup()
{
  Serial.begin(9600);
  lcd.begin(16, 2);
  Serial.println();
  pinMode(REDLED ,OUTPUT);
  pinMode(YLED ,OUTPUT);
  pinMode(GLED ,OUTPUT);
  pinMode(SOUND ,OUTPUT);
  lcd.println("RH(%)  (C)   (F)     ");
  dht.setup(10); // data pin 10
}

void loop()
{
  delay(dht.getMinimumSamplingPeriod());

  float humidity = dht.getHumidity();
  float temperature = dht.getTemperature();
  
  if(temperature<=25){
    digitalWrite(REDLED,LOW);
    digitalWrite(YLED,LOW);
    digitalWrite(GLED,HIGH);
    noTone(SOUND);
    
  }else if(temperature>25 && temperature<=35){
    digitalWrite(REDLED,LOW);
    digitalWrite(YLED,HIGH);
    digitalWrite(GLED,LOW);
    noTone(SOUND);
  }else if(temperature>35){
    digitalWrite(REDLED,HIGH);
    digitalWrite(YLED,LOW);
    digitalWrite(GLED,LOW);
    for(int i=0;i<5;i++){
     
     tone(SOUND,500);
    delay(1000);
    noTone(SOUND);
    delay(1000);
      
    }
    
  }
  
  lcd.setCursor(0,2);
  lcd.print(int(humidity));
  lcd.print("     ");
  lcd.print(int(temperature));
   lcd.print("    ");
  lcd.print(int(dht.toFahrenheit(temperature)));
  
}
