package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.entities.User;

public interface UserService {

    FullUserDto login(CredentialsDto credentialsDto);

    User getUser(Long id);

    BasicUserDto getUserById(Long id);
}
