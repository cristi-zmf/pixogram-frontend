package com.cristi.mentool.mentoolfront;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableEurekaClient
@EnableZuulProxy
@RibbonClient(name = "default-ribbon")
@EnableFeignClients
public class PixogramFrontApplication {

	public static void main(String[] args) {
		SpringApplication.run(PixogramFrontApplication.class, args);
	}

}

