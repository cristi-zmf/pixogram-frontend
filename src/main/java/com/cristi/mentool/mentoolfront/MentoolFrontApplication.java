package com.cristi.mentool.mentoolfront;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@SpringBootApplication
@EnableEurekaClient
@EnableZuulProxy
@RibbonClient(name = "default-ribbon")
public class MentoolFrontApplication {

	public static void main(String[] args) {
		SpringApplication.run(MentoolFrontApplication.class, args);
	}

}

