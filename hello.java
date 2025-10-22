
import java.util.Scanner;

public class hello {
    public static void main(String args[]){
    System.out.println("Hello World!");
    Scanner sc=new Scanner(System.in);
    System.out.print("Enter a number: ");
    int i=sc.nextInt();
    if(i%2==0){
        System.out.println("Entered no. is even");
    } else System.out.println("Entered no. is odd");
    sc.close();
}

}

    