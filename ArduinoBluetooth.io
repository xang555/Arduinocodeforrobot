#include <motor_driver.h>
#include<ctype.h>
#define N1 22
#define N2  23
#define N3 24
#define N4 25
#define PWM_A 26
#define PWM_B 27
#define N21 44
#define N22 45
#define N23 46
#define N24 47
#define PWM_A2 48
#define PWM_B2 49
char junk;
String inputString="";
int PWM=255;
void setup()                    // run once, when the sketch starts
{
 Serial.begin(9600);            // set the baud rate to 9600, same should be of your Serial Monitor
 //setup pin motrodriver 1
     pinMode(N1,OUTPUT);
  pinMode(N2,OUTPUT);
   pinMode(N3,OUTPUT);
  pinMode(N4,OUTPUT);
   pinMode(PWM_A,OUTPUT);
  pinMode(PWM_B,OUTPUT);
  //setup pin motordriver 2
   pinMode(N21,OUTPUT);
  pinMode(N22,OUTPUT);
   pinMode(N23,OUTPUT);
  pinMode(N24,OUTPUT);
   pinMode(PWM_A2,OUTPUT);
  pinMode(PWM_B2,OUTPUT);
  //======================
 pinMode(13, OUTPUT);
 pinMode(12,OUTPUT);
  pinMode(11, OUTPUT);
 pinMode(10,OUTPUT);
}

void loop()
{
  if(Serial.available()){
  while(Serial.available())
    {
      char inChar = (char)Serial.read(); //read the input
      inputString += inChar;        //make a string of the characters coming on serial
    }
    Serial.println(inputString);
        // clear the serial buffer
    if(inputString == "l"){         //in case of 'a' turn the LED on
       m1_rtl(N1,N2,PWM_A,PWM);
       m2_ltr(N3,N4,PWM_B,PWM);
      digitalWrite(13, HIGH);
       digitalWrite(10, LOW);
      digitalWrite(12, LOW);
      digitalWrite(11, LOW);  
    }else if(inputString == "r"){   //incase of 'b' turn the LED off
       m1_ltr(N1,N2,PWM_A,PWM);
       m2_rtl(N3,N4,PWM_B,PWM);
      digitalWrite(12, HIGH);
        digitalWrite(10, LOW);
      digitalWrite(13, LOW);
      digitalWrite(11, LOW);
    }else if(inputString == "u"){
       m1_rtl(N1,N2,PWM_A,PWM);
       m2_rtl(N3,N4,PWM_B,PWM);
       digitalWrite(11, HIGH);
       digitalWrite(10, LOW);
      digitalWrite(12, LOW);
      digitalWrite(13, LOW);
    }else if(inputString == "d"){
      m1_ltr(N1,N2,PWM_A,PWM);
        m2_ltr(N3,N4,PWM_B,PWM);
      digitalWrite(10, HIGH);
      digitalWrite(13, LOW);
      digitalWrite(12, LOW);
      digitalWrite(11, LOW);
    }else if(inputString=="s"){
       m1_stop(N1,N2,PWM_A);
      m2_stop(N3,N4,PWM_B);
      m1_stop(N21,N22,PWM_A2);
      m2_stop(N23,N24,PWM_B2);
    }
         inputString = "";
  }
}
