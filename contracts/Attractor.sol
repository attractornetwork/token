// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from '@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol';
import {ERC20Burnable} from '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import {ERC20Capped} from '@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol';
import {AccessControl} from '@openzeppelin/contracts/access/AccessControl.sol';

contract Attractor is ERC20Capped, ERC20Permit, ERC20Burnable, AccessControl {
    constructor()
        ERC20("Attractor", "ATTRA")
        ERC20Permit("Attractor")
        ERC20Capped(1e9 * 1e18)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    function _update(address from, address to, uint256 value) internal virtual override(ERC20Capped, ERC20) {
        ERC20Capped._update(from, to, value);
    }

    function mint(address account, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(account, amount);
    }
}
