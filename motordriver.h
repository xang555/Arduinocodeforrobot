#include<Arduino.h>
//function control motor by use motor Driver

//----------------motor A==============//
void m1_ltr(int N1,int N2,int PWM1,int v){//left to rigth
	analogWrite(PWM1,v);
	digitalWrite(N1,LOW);
	digitalWrite(N2,HIGH);
		}
void m1_rtl(int N1,int N2,int PWM1,int v){//rigth to left
	
	analogWrite(PWM1,v);
	digitalWrite(N1,HIGH);
	digitalWrite(N2,LOW);
		
}		
void m1_stop(int N1,int N2,int PWM1){//stop
	
	analogWrite(PWM1,0);
	digitalWrite(N1,LOW);
	digitalWrite(N2,LOW);
		
}
//-----------motor B---------//

void m2_ltr(int N3,int N4,int PWM2,int v){//left to rigth
	
	analogWrite(PWM2,v);
	digitalWrite(N3,LOW);
	digitalWrite(N4,HIGH);
		
}
void m2_rtl(int N3,int N4,int PWM2,int v){//rigth to left
	
	analogWrite(PWM2,v);
	digitalWrite(N3,HIGH);
	digitalWrite(N4,LOW);
		
}
void m2_stop(int N3,int N4,int PWM2){//stop
	
	analogWrite(PWM2,0);
	digitalWrite(N3,LOW);
	digitalWrite(N4,LOW);
		
}




